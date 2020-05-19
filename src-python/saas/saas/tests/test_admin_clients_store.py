import unittest

from pyramid import testing


class TestAdminClientStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.modules.admin.stores.clients import ClientsStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.clientStore = ClientsStore(self.mgr['default'])

    def test_get_all_clients(self):
        result = self.clientStore.getAll()
        self.assertNotEqual(0, len(result), '{0}'.format(result))

    def test_add_client(self):
        result = self.clientStore.add('test1', 'test1')
        self.assertNotEqual(True, result, '{0}'.format(result))