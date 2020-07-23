import unittest

from pyramid import testing

import string
import random


class TestUserStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.core.stores.user import UserStore
        from saas.app.core.stores.client import ClientStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.userStore = UserStore(self.mgr, 'default')
        self.clientStore = ClientStore(self.mgr, 'default')

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_user_add(self):
        random_name = self.generate_random_str(10)
        email = '{0}@{1}.com'.format(random_name, random_name)
        result = self.userStore.userAdd(email, random_name)
        self.assertNotEqual(None, result)

    def test_user_add_duplicate(self):
        random_name = self.generate_random_str(10)
        email = '{0}@{1}.com'.format(random_name, random_name)
        result = self.userStore.userAdd(email, random_name)
        self.assertRaises(
            Exception,
            self.userStore.userAdd,
            email,
            random_name
        )

    def test_email_exists(self):
        random_name = self.generate_random_str(10)
        email = '{0}@{1}.com'.format(random_name, random_name)
        result = self.userStore.userAdd(email, random_name)
        result = self.userStore.emailExists(email)
        self.assertEqual(True, result, '{0}'.format(result))

    def test_user_by_email(self):
        random_name = self.generate_random_str(10)
        email = '{0}@{1}.com'.format(random_name, random_name)
        result = self.userStore.userAdd(email, random_name)
        result = self.userStore.userByEmail(email)
        self.assertEqual(email, result[3], '{0}'.format(result))

    def test_user_clients(self):
        random_name = self.generate_random_str(10)
        email = '{0}@{1}.com'.format(random_name, random_name)
        user_id = self.userStore.userAdd(email, random_name)
        clients = self.userStore.userClients(user_id)
        self.assertNotEqual(0, len(clients), '{0}'.format(clients))

    def test_user_has_permission(self):
        random_name = self.generate_random_str(10)
        email = '{0}@{1}.com'.format(random_name, random_name)
        user_id = self.userStore.userAdd(email, random_name)
        
        client = self.clientStore.getDefaultClient()
        client_id = client[0]

        result = self.userStore.userHasPermission(user_id, client_id, 'user.authenticated')
        self.assertEqual(True, result, '{0} {1}'.format(result, email))