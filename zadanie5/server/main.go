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
	ProductIDs []int  `json:"productId"`
	Method     string `json:"method"`
}

var products = []product{
	{ID: 1, Name: "Coffee", Price: 12.5},
	{ID: 2, Name: "Tea", Price: 10},
	{ID: 3, Name: "Cookie", Price: 5.7},
}

func main() {
	e := echo.New()

	e.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			log.Printf("Incoming request: %s %s", c.Request().Method, c.Request().URL.Path)
			return next(c)
		}
	})

	e.GET("/products", func(c echo.Context) error {
		log.Println("Sending products:", products)
		return c.JSONPretty(http.StatusOK, products, "  ")
	})

	e.POST("/payments", func(c echo.Context) error {
		var p payment
		if err := c.Bind(&p); err != nil {
			log.Println("Invalid payment payload")
			return c.NoContent(http.StatusBadRequest)
		}
		log.Printf("Payment received: %v via %s", p.ProductIDs, p.Method)
		return c.NoContent(http.StatusCreated)
	})	

	log.Println("Server running on http://localhost:8081")
	e.Logger.Fatal(e.Start(":8081"))
}
