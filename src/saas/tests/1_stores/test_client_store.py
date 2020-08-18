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

        self.default_client = self.clientStore.getDefaultClient()

    def test_get_default_client(self):
        client = self.clientStore.getDefaultClient()
        self.assertEqual('default', client[2], '{0}'.format(client))

    def test_get_client_by_name(self):
        client = self.clientStore.by_name('deFaUlt')
        self.assertTrue(client, '{0}'.format(client))