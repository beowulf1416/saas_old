import unittest

from pyramid import testing

import string
import random


class TestAdminRolesStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.modules.admin.stores.clients import ClientsStore
        from saas.app.core.stores.client import ClientStore
        from saas.app.modules.admin.stores.roles import RolesStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.clientsStore = ClientsStore(self.mgr, 'default')
        self.clientStore = ClientStore(self.mgr, 'default')
        self.rolesStore = RolesStore(self.mgr, 'default')

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_get_all_roles(self):
        try:
            (client_id, active, name, address) = self.clientStore.getDefaultClient()
            result = self.rolesStore.getAll(client_id)
        except Exception as e:
            self.fail(e)

    def test_add_role(self):
        try:
            (client_id, active, name, address) = self.clientStore.getDefaultClient()
            random_name = self.generate_random_str(10)
            self.rolesStore.add(client_id, random_name)
        except Exception as e:
            self.fail(e)

    def test_add_role_not_unique(self):
        (client_id, active, name, address) = self.clientStore.getDefaultClient()
        random_name = self.generate_random_str(10)
        result = self.rolesStore.add(client_id, random_name)
        self.assertRaises(
            Exception,
            self.rolesStore.add,
            client_id,
            random_name
        )

    def test_set_active_role(self):
        try:
            (client_id, active, name, address) = self.clientStore.getDefaultClient()
            random_name = self.generate_random_str(10)
            role_id = self.rolesStore.add(client_id, random_name)
            self.rolesStore.setActive(role_id, False)
        except Exception as e:
            self.fail(e)

    def test_role_filter(self):
        try:
            (client_id, active, name, address) = self.clientStore.getDefaultClient()
            result = self.rolesStore.filter(client_id, 'every')
            self.assertGreater(len(result), 0, '{0}'.format(result))
        except Exception as e:
            self.fail(e)