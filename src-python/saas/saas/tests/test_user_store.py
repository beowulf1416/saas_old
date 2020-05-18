import unittest

from pyramid import testing


class TestUserStore(unittest.TestCase):

    # mgr = None
    # userStore = None

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.core.stores.user import UserStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.userStore = UserStore(self.mgr['default'])


    def test_email_exists(self):
        result = self.userStore.emailExists('beowulf1416@gmail.com')
        self.assertEqual(True, result, '{0}'.format(result))

    def test_user_add(self):
        result = self.userStore.userAdd('test2@test2.com', 'test2')
        self.assertNotEqual(None, result)

    def test_user_by_email(self):
        result = self.userStore.userByEmail('test1@test1.com')
        self.assertEqual(1, len(result), '{0}'.format(result))