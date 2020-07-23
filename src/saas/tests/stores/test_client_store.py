import unittest

from pyramid import testing


class TestClientStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.core.stores.client import ClientStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.clientStore = ClientStore(self.mgr, 'default')

    def test_get_default_client(self):
        client = self.clientStore.getDefaultClient()
        self.assertEqual('default', client[2], '{0}'.format(client))