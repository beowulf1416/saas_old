import unittest

from pyramid import testing

import string
import random


class TestAdminUsersStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.modules.admin.stores.clients import ClientsStore
        from saas.app.core.stores.client import ClientStore
        from saas.app.modules.admin.stores.roles import RolesStore
        from saas.app.modules.admin.stores.users import UsersStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.clientsStore = ClientsStore(self.mgr, 'default')
        self.clientStore = ClientStore(self.mgr, 'default')
        self.rolesStore = RolesStore(self.mgr, 'default')
        self.usersStore = UsersStore(self.mgr, 'default')

    def test_client_get_users(self):
        try:
            (client_id, active, name, address, url_name) = self.clientStore.getDefaultClient()
            users = self.usersStore.getAllClientUsers(client_id)
        except Exception as e:
            self.fail(e)