package main

import (
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

type product struct {
	ID    int     `json:"id"`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

type payment struct {
	ProductID int    `json:"productId"`
	Method    string `json:"method"`
}

var products = []product{
	{ID: 1, Name: "Coffee", Price: 12.5},
	{ID: 2, Name: "Tea", Price: 10},
	{ID: 3, Name: "Cookie", Price: 5.7},
}

func main() {
	e := echo.New()

	e.GET("/products", func(c echo.Context) error {
		return c.JSONPretty(http.StatusOK, products, "  ")
	})

	e.POST("/payments", func(c echo.Context) error {
		var p payment
		if err := c.Bind(&p); err != nil {
			return c.NoContent(http.StatusBadRequest)
		}
		log.Println("payment received:", p)
		return c.NoContent(http.StatusCreated)
	})

	e.Logger.Fatal(e.Start(":8081"))
}
