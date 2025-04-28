from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def get_cart_badge(driver):
    cart_link = driver.find_elements(By.CSS_SELECTOR, "nav a")[1]
    import re
    m = re.search(r"\((\d)\)", cart_link.text)
    return int(m.group(1)) if m else 0

def click_nav(driver, label: str, timeout: int = 4):
    driver.find_element(By.PARTIAL_LINK_TEXT, label).click()
    if label.lower() == "products":
        WebDriverWait(driver, timeout).until(
            EC.presence_of_element_located((By.TAG_NAME, "h2"))
        )
    else:
        WebDriverWait(driver, timeout).until(EC.url_contains(label.lower()))

