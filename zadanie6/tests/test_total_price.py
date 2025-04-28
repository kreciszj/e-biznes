from selenium.webdriver.common.by import By
from conftest import BASE_URL
from helpers import click_nav

def _add(driver, idx, times=1):
    for _ in range(times):
        driver.find_elements(By.CSS_SELECTOR, "button")[idx].click()

def test_total_for_two_products(driver):
    driver.get(f"{BASE_URL}/")
    _add(driver, 0)
    _add(driver, 2)

    click_nav(driver, "Cart")
    assert "Total:" in driver.page_source
    assert "18.2" in driver.page_source
