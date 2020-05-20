import unittest

from pyramid import testing

import string
import random


class TestAdminClientStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.modules.admin.stores.clients import ClientsStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.clientStore = ClientsStore(self.mgr)

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_get_all_clients(self):
        result = self.clientStore.getAll()
        self.assertNotEqual(0, len(result), '{0}'.format(result))

    def test_add_client(self):
        random_name = self.generate_random_str(10)
        try:
            self.clientStore.add(random_name, random_name, random_name)
        except Exception as e:
            self.fail(e)

    def test_add_client_not_unique(self):
        random_name = self.generate_random_str(10)
        self.clientStore.add(random_name, random_name, random_name)
        self.assertRaises(
            Exception,
            self.clientStore.add,
            random_name,
            random_name,
            random_name
        )
        

    def test_set_active(self):
        random_name = self.generate_random_str(10)
        client_id = self.clientStore.add(random_name, random_name, random_name)
        try:
            self.clientStore.setActive(client_id, False)
        except Exception as e:
            self.fail(e)