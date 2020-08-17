import unittest
import pytest
from pyramid.paster import get_appsettings

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.client import ClientStore
from saas.app.modules.admin.stores.users import UsersStore

import time
import jwt

import logging
log = logging.getLogger(__name__)


class TestAuthenticatedPage(unittest.TestCase):

    def setUp(self):
        self.settings = get_appsettings('testing.ini', name='main')

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.clientStore = ClientStore(self.mgr, 'default')
        self.defaultClient = self.clientStore.getDefaultClient()

        default_client_id = self.defaultClient[0]

        usersStore = UsersStore(self.mgr, 'default')
        users = usersStore.getAllClientUsers(default_client_id)
        default_user = users[0]
        default_user_email = default_user[2]

        self.session = self.driver = webdriver.Firefox()
        self.session.get('http://saas.com')

        # set up cookie
        JWT_KEY = self.settings['jwt.secret']
        COOKIE_MAX_AGE = self.settings['cookie.max_age']

        now = time.time()
        created = renewed = accessed = now

        cookie_value = jwt.encode(
            {
                'email': default_user_email,
                'client': default_client_id,
                'iat': created,
                'updated_at': renewed
            },
            key=JWT_KEY,
            algorithm='HS256'
        )

        self.session.add_cookie({
            'name': 'session',
            'value': cookie_value.decode('utf-8'),
            'max_age': COOKIE_MAX_AGE,
            'path': '/',
            'secure': False,
            'samesite': 'Lax' 
        })
        
        # reload page
        self.session.get('http://saas.com')

    def tearDown(self):
        self.driver.close()

    def test_authenticate(self):
        WebDriverWait(self.session, 10).until(
            EC.presence_of_element_located((By.ID, 'nav-user'))
        )

        elem = self.session.find_element_by_id('nav-user')
        self.assertTrue(elem)