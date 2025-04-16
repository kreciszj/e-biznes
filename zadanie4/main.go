package main

import (
	"net/http"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Product struct {
	ID          uint   `json:"id" gorm:"primaryKey"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Price       int    `json:"price"`
}

type Cart struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time `json:"created_at"`
	Products  []Product `json:"products" gorm:"many2many:cart_products;"`
}

var db *gorm.DB

func listProducts(c echo.Context) error {
	var products []Product
	if err := db.Find(&products).Error; err != nil {
		return c.NoContent(http.StatusInternalServerError)
	}
	return c.JSON(http.StatusOK, products)
}

func getProduct(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	var product Product
	if err = db.First(&product, id).Error; err != nil {
		return c.NoContent(http.StatusNotFound)
	}
	return c.JSON(http.StatusOK, product)
}

func createProduct(c echo.Context) error {
	var product Product
	if err := c.Bind(&product); err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	if err := db.Create(&product).Error; err != nil {
		return c.NoContent(http.StatusInternalServerError)
	}
	return c.JSON(http.StatusCreated, product)
}

func updateProduct(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	var body Product
	if err = c.Bind(&body); err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	var product Product
	if err = db.First(&product, id).Error; err != nil {
		return c.NoContent(http.StatusNotFound)
	}
	product.Name        = body.Name
	product.Description = body.Description
	product.Price       = body.Price
	if err = db.Save(&product).Error; err != nil {
		return c.NoContent(http.StatusInternalServerError)
	}
	return c.JSON(http.StatusOK, product)
}

func deleteProduct(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	if err = db.Delete(&Product{}, id).Error; err != nil {
		return c.NoContent(http.StatusInternalServerError)
	}
	return c.NoContent(http.StatusNoContent)
}

func listCarts(c echo.Context) error {
	var carts []Cart
	if err := db.Find(&carts).Error; err != nil {
		return c.NoContent(http.StatusInternalServerError)
	}
	return c.JSON(http.StatusOK, carts)
}

func getCart(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	var cart Cart
	if err = db.First(&cart, id).Error; err != nil {
		return c.NoContent(http.StatusNotFound)
	}
	return c.JSON(http.StatusOK, cart)
}

func createCart(c echo.Context) error {
	var cart Cart
	if err := db.Create(&cart).Error; err != nil {
		return c.NoContent(http.StatusInternalServerError)
	}
	return c.JSON(http.StatusCreated, cart)
}

func listCartProducts(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	var cart Cart
	if err = db.Preload("Products").First(&cart, id).Error; err != nil {
		return c.NoContent(http.StatusNotFound)
	}
	return c.JSON(http.StatusOK, cart.Products)
}

type attachDTO struct {
	ProductID uint `json:"product_id"`
}

func addProductToCart(c echo.Context) error {
	cartID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	var body attachDTO
	if err = c.Bind(&body); err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	var cart Cart
	if err = db.First(&cart, cartID).Error; err != nil {
		return c.NoContent(http.StatusNotFound)
	}
	var product Product
	if err = db.First(&product, body.ProductID).Error; err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	if err = db.Model(&cart).Association("Products").Append(&product); err != nil {
		return c.NoContent(http.StatusInternalServerError)
	}
	return c.NoContent(http.StatusCreated)
}

func removeProductFromCart(c echo.Context) error {
	cartID, _ := strconv.Atoi(c.Param("id"))
	prodID, _ := strconv.Atoi(c.Param("pid"))

	var cart Cart
	if err := db.First(&cart, cartID).Error; err != nil {
		return c.NoContent(http.StatusNotFound)
	}
	if err := db.Model(&cart).Association("Products").Delete(&Product{ID: uint(prodID)}); err != nil {
		return c.NoContent(http.StatusInternalServerError)
	}
	return c.NoContent(http.StatusNoContent)
}

func main() {
	var err error
	db, err = gorm.Open(sqlite.Open("store.db"), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	if err = db.AutoMigrate(&Product{}, &Cart{}); err != nil {
		panic(err)
	}

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	g := e.Group("/products")
	g.GET("", listProducts)
	g.GET("/:id", getProduct)
	g.POST("", createProduct)
	g.PUT("/:id", updateProduct)
	g.DELETE("/:id", deleteProduct)

	cg := e.Group("/carts")
	cg.GET("", listCarts)
	cg.GET("/:id", getCart)
	cg.POST("", createCart)
	
	cg.GET("/:id/products",  listCartProducts)
	cg.POST("/:id/products", addProductToCart)
	cg.DELETE("/:id/products/:pid", removeProductFromCart)

	e.Logger.Fatal(e.Start(":8080"))
}
