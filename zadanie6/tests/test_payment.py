from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from helpers import get_cart_badge, click_nav
from conftest import BASE_URL

def test_pay_disabled_without_items(driver):
    driver.get(f"{BASE_URL}/payment")
    btn = driver.find_element(By.CSS_SELECTOR, "button")
    assert not btn.is_enabled()

def test_pay_clears_cart(driver):
    driver.get(f"{BASE_URL}/")
    driver.find_elements(By.CSS_SELECTOR, "button")[0].click()
    click_nav(driver, "Payment")

    btn = driver.find_element(By.CSS_SELECTOR, "button")
    assert btn.is_enabled()

    btn.click()
    WebDriverWait(driver, 2).until(EC.alert_is_present())
    driver.switch_to.alert.accept()

    WebDriverWait(driver, 4).until(lambda d: get_cart_badge(d) == 0)
    assert get_cart_badge(driver) == 0
