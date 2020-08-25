import unittest
import pytest
from pyramid.paster import get_appsettings

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import TimeoutException

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.client import ClientStore
from saas.app.modules.admin.stores.users import UsersStore

import time
import jwt

import logging
log = logging.getLogger(__name__)

import string
import random


class TestAdminClients(unittest.TestCase):

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

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def get_shadow_root(self, element):
        return self.session.execute_script('return arguments[0].shadowRoot;', element)

    def test_add_client(self):
        elem = WebDriverWait(self.session, 10).until(
            EC.presence_of_element_located((By.ID, 'nav-admin'))
        )

        # elem = self.session.find_element_by_id('nav-admin')
        elem.click()

        elem = self.session.find_element_by_css_selector('[data-action="admin.clients"]')
        elem.click()

        tab = self.get_shadow_root(self.session.find_element_by_css_selector('tab-container'))

        clients_table = tab.find_element_by_css_selector('clients-table')
        sr = self.get_shadow_root(clients_table)
        btn = sr.find_element_by_id('btn-new')
        btn.click()

        client_editor = tab.find_element_by_css_selector('client-editor')
        sr_ce = self.get_shadow_root(client_editor)
        random_str = self.generate_random_str(10)
        
        input_name = sr_ce.find_element_by_id('name')
        input_name.send_keys(random_str)

        input_address = sr_ce.find_element_by_id('address')
        input_address.send_keys(random_str)

        # press country selector
        country = sr_ce.find_element_by_id('country')
        sr_country = self.get_shadow_root(country)
        btn = sr_country.find_element_by_id('btn-select')
        btn.click()

        # country-selector-view
        try:
            country_selector_view = WebDriverWait(self.session, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'country-selector-view'))
            )
            # country_selector_view = self.session.find_element_by_css_selector('country-selector-view')
            sr_csv = self.get_shadow_root(country_selector_view)
            form_search = sr_csv.find_element_by_id('search')
            sr_fs = self.get_shadow_root(form_search)
            sr_fs.find_element_by_id('filter').send_keys('philippines')
            sr_fs.find_element_by_id('btn-filter').click()
            radio_phil = WebDriverWait(sr_csv, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '.form-input-selected[value="608"]'))
            )
            # radio_phil = sr_csv.find_element_by_css_selector('.form-input-selected[value="608"]')
            radio_phil.click()
        except TimeoutException as e:
            self.fail(e)

        # press currency selector
        currency = sr_ce.find_element_by_id('currency')
        sr_currency = self.get_shadow_root(currency)
        btn = sr_currency.find_element_by_id('btn-select')
        btn.click()

        # currency-selector-view
        try:
            currency_selector_view = WebDriverWait(self.session, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'currency-selector-view'))
            )
            # currency_selector_view = self.session.find_element_by_css_selector('currency-selector-view')
            sr_csv = self.get_shadow_root(currency_selector_view)
            sr_csv.find_element_by_id('filter').send_keys('peso')
            sr_csv.find_element_by_id('btn-filter').click()
            radio_peso = WebDriverWait(sr_csv, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '.form-input-selected[value="108"]'))
            )
            # radio_peso = sr_csv.find_element_by_css_selector('.form-input-selected[value="108"]')
            radio_peso.click()
        except TimeoutException as e:
            self.fail(e)

        btn_save = sr_ce.find_element_by_id('btn-save')
        btn_save.click()

        nl = self.session.find_element_by_css_selector('notification-list')
        log.error(nl.get_attribute('innerHTML'))

        notifier = self.get_shadow_root(self.session.find_element_by_css_selector('notification-list'))
        try:
            # notification = notifier.find_element_by_css_selector('.notification .is-success')
            # notification = WebDriverWait(notifier, 10).until(
            #     EC.presence_of_element_located((By.CSS_SELECTOR, '.notification .is-success')) 
            # )
            log.error(notifier)
            # self.assertIsNotNone(notification, 'Client was not added')
        except TimeoutException as e:
            log.error(e)
            self.fail(e)