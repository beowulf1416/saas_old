import unittest

from pyramid import testing

import string
import random
import uuid


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
        self.client = self.clientStore.getDefaultClient()

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_get_all_roles(self):
        client_id = self.client[0]
        try:
            result = self.rolesStore.getAll(client_id)
        except Exception as e:
            self.fail(e)

    def test_add_role(self):
        client_id = self.client[0]
        try:
            role_id = str(uuid.uuid4())
            random_name = self.generate_random_str(10)
            self.rolesStore.add(client_id, role_id, random_name)
        except Exception as e:
            self.fail(e)

    def test_add_role_not_unique(self):
        client_id = self.client[0]
        role_id1 = str(uuid.uuid4())
        role_id2 = str(uuid.uuid4())
        random_name = self.generate_random_str(10)
        self.rolesStore.add(client_id, role_id1, random_name)
        self.assertRaises(
            Exception,
            self.rolesStore.add,
            client_id,
            role_id2,
            random_name
        )

    def test_set_active_role(self):
        client_id = self.client[0]
        role_id = str(uuid.uuid4())
        random_name = self.generate_random_str(10)
        try:
            self.rolesStore.add(client_id, role_id, random_name)
            self.rolesStore.setActive(role_id, False)
        except Exception as e:
            self.fail(e)

    def test_role_filter(self):
        client_id = self.client[0]
        try:
            result = self.rolesStore.filter(client_id, 'every')
            self.assertGreater(len(result), 0, '{0}'.format(result))
        except Exception as e:
            self.fail(e)