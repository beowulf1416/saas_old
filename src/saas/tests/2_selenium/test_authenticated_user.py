import unittest
import pytest

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

class TestAuthenticatedPages(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.get('http://saas.com')

    def tearDown(self):
        self.driver.close()

    def test_dashboard(self):
        self.assertIn('Welcome', self.driver.title)

        self.driver.implicitly_wait(30)

        elem = self.driver.find_element_by_id('link-news')
        self.assertTrue(elem)