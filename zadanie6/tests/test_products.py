from conftest import BASE_URL
from helpers import get_cart_badge
import pytest

def test_products_page_loads(driver):
    driver.get(f"{BASE_URL}/")
    assert "Products" in driver.page_source

def test_products_list_has_three(driver):
    driver.get(f"{BASE_URL}/")
    items = driver.find_elements("css selector", "li")
    assert len(items) >= 3

@pytest.mark.parametrize("idx", [0, 1, 2])
def test_add_each_product_increments_badge(driver, idx):
    driver.get(f"{BASE_URL}/")
    buttons = driver.find_elements("css selector", "button")
    before = get_cart_badge(driver)
    buttons[idx].click()
    after = get_cart_badge(driver)
    assert after == before + 1
