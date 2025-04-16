package main

import (
	"net/http"
	"strconv"

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


func main() {
	var err error
	db, err = gorm.Open(sqlite.Open("store.db"), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	if err = db.AutoMigrate(&Product{}); err != nil {
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

	e.Logger.Fatal(e.Start(":8080"))
}
