from helpers import click_nav
from conftest import BASE_URL
from selenium.webdriver.common.by import By

def test_nav_to_products(driver):
    driver.get(f"{BASE_URL}/")
    click_nav(driver, "Products")
    assert "/#" in driver.current_url or driver.current_url.endswith("/")

def test_nav_to_cart(driver):
    driver.get(f"{BASE_URL}/")
    click_nav(driver, "Cart")
    assert "/cart" in driver.current_url

def test_nav_to_payment(driver):
    driver.get(f"{BASE_URL}/")
    click_nav(driver, "Payment")
    assert "/payment" in driver.current_url

def test_nav_roundtrip(driver):
    driver.get(f"{BASE_URL}/")
    click_nav(driver, "Cart")
    assert "/cart" in driver.current_url
    click_nav(driver, "Products")
    assert "Products" in driver.find_element(By.TAG_NAME, "h2").text