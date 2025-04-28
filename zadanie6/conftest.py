import pytest
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options

BASE_URL = "http://localhost"

@pytest.fixture(scope="session")
def driver():
    opts = Options()
    opts.add_argument("--headless=new")
    service = ChromeService(executable_path=ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=opts)
    driver.implicitly_wait(3)
    yield driver
    driver.quit()
