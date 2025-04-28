from selenium.webdriver.common.by import By
from helpers import get_cart_badge, click_nav
from conftest import BASE_URL
import pytest

def test_cart_empty_message(driver):
    driver.get(f"{BASE_URL}/cart")
    assert "empty" in driver.page_source.lower()

def test_cart_shows_items_and_total(driver):
    driver.get(f"{BASE_URL}/")
    driver.find_elements(By.CSS_SELECTOR, "button")[0].click()
    driver.find_elements(By.CSS_SELECTOR, "button")[1].click()

    click_nav(driver, "Cart")

    rows = driver.find_elements(By.CSS_SELECTOR, "ul li")
    assert len(rows) == 2
    assert "Total:" in driver.page_source

@pytest.mark.parametrize("clicks", [1, 2, 3, 5, 7, 8])
def test_cart_badge_matches_clicks(driver, clicks):
    driver.get(f"{BASE_URL}/")
    for _ in range(clicks):
        driver.find_elements(By.CSS_SELECTOR, "button")[0].click()
    assert get_cart_badge(driver) == clicks

