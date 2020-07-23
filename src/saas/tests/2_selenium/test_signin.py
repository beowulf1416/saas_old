import unittest
import pytest

from pyramid import testing


def test_home_page(selenium):
    selenium.get('http://saas.com')
    assert 'Welcome' in selenium.title

