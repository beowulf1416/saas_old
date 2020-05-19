import unittest

from pyramid import testing


class TestUserStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.core.stores.user import UserStore
        from saas.app.core.stores.client import ClientStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.userStore = UserStore(self.mgr['default'])
        self.clientStore = ClientStore(self.mgr['default'])


    def test_email_exists(self):
        result = self.userStore.emailExists('beowulf1416@gmail.com')
        self.assertEqual(True, result, '{0}'.format(result))

    def test_user_add(self):
        result = self.userStore.userAdd('test2@test2.com', 'test2')
        self.assertNotEqual(None, result)

    def test_user_by_email(self):
        result = self.userStore.userByEmail('test1@test1.com')
        self.assertEqual('test1@test1.com', result[3], '{0}'.format(result))

    def test_user_clients(self):
        user = self.userStore.userByEmail('beowulf1416@gmail.com')
        user_id = user[0]
        result = self.userStore.userClients(user_id)
        self.assertNotEqual(0, len(result), '{0}'.format(result))

    def test_user_has_permission(self):
        user = self.userStore.userByEmail('beowulf1416@gmail.com')
        user_id = user[0]
        
        client = self.clientStore.getDefaultClient()
        client_id = client[0]

        result = self.userStore.userHasPermission(user_id, client_id, 'user.authenticated')
        self.assertEqual(True, result, '{0}'.format(result))