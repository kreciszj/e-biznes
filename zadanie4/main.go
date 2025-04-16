package main

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Product struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Price       int    `json:"price"`
}

var products = []Product{}
var nextID = 1

func listProducts(c echo.Context) error {
	return c.JSON(http.StatusOK, products)
}

func getProduct(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	for _, p := range products {
		if p.ID == id {
			return c.JSON(http.StatusOK, p)
		}
	}
	return c.NoContent(http.StatusNotFound)
}

func createProduct(c echo.Context) error {
	var p Product
	if err := c.Bind(&p); err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	p.ID = nextID
	nextID++
	products = append(products, p)
	return c.JSON(http.StatusCreated, p)
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
	for i, p := range products {
		if p.ID == id {
			body.ID = id
			products[i] = body
			return c.JSON(http.StatusOK, body)
		}
	}
	return c.NoContent(http.StatusNotFound)
}

func deleteProduct(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	for i, p := range products {
		if p.ID == id {
			products = append(products[:i], products[i+1:]...)
			return c.NoContent(http.StatusNoContent)
		}
	}
	return c.NoContent(http.StatusNotFound)
}

func main() {
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
