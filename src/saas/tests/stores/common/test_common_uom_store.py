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

    def test_uom_length(self):
        result = self.uomStore.length()
        self.assertGreater(len(result), 0)

    def test_uom_area(self):
        result = self.uomStore.area()
        self.assertGreater(len(result), 0)

    def test_uom_volume(self):
        result = self.uomStore.volume()
        self.assertGreater(len(result), 0)

    def test_uom_weight(self):
        result = self.uomStore.weight()
        self.assertGreater(len(result), 0)
    
    def test_uom_quantity(self):
        result = self.uomStore.quantity()
        self.assertGreater(len(result), 0)

    def test_uom_all(self):
        result = self.uomStore.all()
        self.assertGreater(len(result), 0)