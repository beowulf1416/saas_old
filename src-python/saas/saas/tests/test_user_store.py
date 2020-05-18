import unittest

from pyramid import testing


class TestUserStore(unittest.TestCase):

    def test_email_exists(self):
        from saas.app.core.services.connection import ConnectionManager
        from saas.app.core.stores.user import UserStore

        mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        userStore = UserStore(mgr['default'])
        [(result, ), ] = userStore.emailExists('beowulf1416@gmail.com')
        self.assertEqual(True, result, '{0}'.format(result))
