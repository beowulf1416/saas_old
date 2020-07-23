import unittest

from pyramid import testing

import string
import random
import uuid


class TestInventoryWarehouseStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.modules.inventory.stores.warehouses import WarehouseStore
        from saas.app.core.stores.client import ClientStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.warehouseStore = WarehouseStore(self.mgr, 'default')
        self.clientStore = ClientStore(self.mgr, 'default')

        self.defaultClient = self.clientStore.getDefaultClient()

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_warehouse_add(self):
        random_str = self.generate_random_str(10)
        warehouse_id = str(uuid.uuid4())
        client_id = self.defaultClient[0]
        try:
            self.warehouseStore.add(client_id, warehouse_id, random_str, random_str)
        except Exception as e:
            self.fail(e)

    def test_warehouse_all(self):
        client_id = self.defaultClient[0]
        try:
            result = self.warehouseStore.all(client_id)
        except Exception as e:
            self.fail(e)

    def test_warehouse_filter(self):
        client_id = self.defaultClient[0]
        try:
            result = self.warehouseStore.filter(client_id, '')
            self.assertGreater(len(result), 0, '{0}'.format(result))
        except Exception as e:
            self.fail(e)

    def test_warehouse_get(self):
        random_str = self.generate_random_str(10)
        client_id = self.defaultClient[0]
        warehouse_id = str(uuid.uuid4())
        try:
            self.warehouseStore.add(client_id, warehouse_id, random_str, random_str)
            warehouse = self.warehouseStore.get(client_id, warehouse_id)
            self.assertEqual(warehouse_id, warehouse[0], '{0}'.format(warehouse))
        except Exception as e:
            self.fail(e)