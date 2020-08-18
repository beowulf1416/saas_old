import unittest

from pyramid import testing

import string
import random
import uuid

class TestAdminUsersStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.modules.admin.stores.clients import ClientsStore
        from saas.app.core.stores.client import ClientStore
        from saas.app.modules.admin.stores.roles import RolesStore
        from saas.app.modules.admin.stores.users import UsersStore
        from saas.app.core.stores.user import UserStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.clientsStore = ClientsStore(self.mgr, 'default')
        self.clientStore = ClientStore(self.mgr, 'default')
        self.rolesStore = RolesStore(self.mgr, 'default')
        self.usersStore = UsersStore(self.mgr, 'default')
        self.userStore = UserStore(self.mgr, 'default')

        self.defaultClient = self.clientStore.getDefaultClient()

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_client_get_users(self):
        try:
            client_id = self.defaultClient[0]
            users = self.usersStore.getAllClientUsers(client_id)
        except Exception as e:
            self.fail(e)

    def test_client_get_roles(self):
        try:
            client_id = self.defaultClient[0]
            users = self.usersStore.getAllClientUsers(client_id)
            user_id = users[0][0]
            roles = self.usersStore.clientRoles(client_id, user_id)
        except Exception as e:
            self.fail(e)

    def test_filter_users(self):
        try:
            result = self.usersStore.filter('com')
            self.assertGreater(len(result), 0, '{0}'.format(result))
        except Exception as e:
            self.fail(e)

    def test_client_set_user_active(self):
        client_id = self.defaultClient[0]

        random_name = self.generate_random_str(10)
        user_id = uuid.uuid4()
        email = '{0}@{1}.com'.format(random_name, random_name)
        self.userStore.userAdd(user_id, email, random_name)

        try:
            self.usersStore.client_user_set_active(
                client_id,
                user_id,
                True
            )
        except Exception as e:
            self.fail(e)