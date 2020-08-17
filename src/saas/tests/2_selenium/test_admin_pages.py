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

import string
import random


class TestAdminModulePage(unittest.TestCase):

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

        log.warning('email: %s', default_user_email)
        log.warning('client: %s', self.defaultClient[2])

        # self.session = webdriver.Firefox()
        self.session = webdriver.Chrome()
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
        self.session.close()

    def get_shadow_root(self, element):
        # element = self.session.find_element_by_css_selector(selector)
        return self.session.execute_script('return arguments[0].shadowRoot;', element)

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_add_client(self):
        WebDriverWait(self.session, 10).until(
            EC.presence_of_element_located((By.ID, 'nav-admin'))
        )

        elem = self.session.find_element_by_id('nav-admin')
        elem.click()

        elem = self.session.find_element_by_css_selector('[data-action="admin.clients"]')
        elem.click()

        tab = self.get_shadow_root(self.session.find_element_by_css_selector('tab-container'))

        clients_table = tab.find_element_by_css_selector('clients-table')
        sr = self.get_shadow_root(clients_table)
        btn = sr.find_element_by_id('btn-new')
        btn.click()

        client_editor = tab.find_element_by_css_selector('client-editor')
        sr = self.get_shadow_root(client_editor)
        random_str = self.generate_random_str(10)
        
        input_name = sr.find_element_by_id('name')
        input_name.send_keys(random_str)

        input_address = sr.find_element_by_id('address')
        input_address.send_keys(random_str)

        btn_save = sr.find_element_by_id('btn-save')
        btn_save.click()

        notifier = self.get_shadow_root(self.session.find_element_by_css_selector('notification-list'))
        elem = WebDriverWait(self.session, 10).until(
            lambda notifier: notifier.find_element_by_css_selector('.notification .is-success') 
        )
        self.assertTrue(elem)

