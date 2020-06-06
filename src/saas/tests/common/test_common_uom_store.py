import unittest

from pyramid import testing


class TestUOMStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.modules.common.stores.uom import UOMStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.uomStore = UOMStore(self.mgr, 'default')

    def test_uom_all(self):
        result = self.uomStore.all()
        self.assertGreater(len(result), 0)