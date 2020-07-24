import unittest
import pytest

from pyramid import testing
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_home_page(selenium):
    selenium.get('http://saas.com')
    assert 'Welcome' in selenium.title

def test_signin_page(selenium):
    selenium.get('http://saas.com')

    actions = ActionChains(selenium)
    elem = selenium.find_element_by_css_selector('a#link-add-security-signin')
    actions.click(elem)

    elem = WebDriverWait(selenium, 10).until(
        EC.title_contains('Sign In')
    )
    assert 'Sign In' in selenium.title
