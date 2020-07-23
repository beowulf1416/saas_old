import unittest

from pyramid import testing

import string
import random
import uuid
from uuid import UUID


class TestInventoryItemsStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.modules.inventory.stores.warehouses import WarehouseStore
        from saas.app.modules.inventory.stores.locations import LocationStore
        from saas.app.core.stores.client import ClientStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.warehouseStore = WarehouseStore(self.mgr, 'default')
        self.locationStore = LocationStore(self.mgr, 'default')
        self.clientStore = ClientStore(self.mgr, 'default')
        self.client = self.clientStore.getDefaultClient()

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_location_add(self):
        random_str = self.generate_random_str(10)
        client_id = self.client[0]
        location_id = str(uuid.uuid4())
        warehouse_id = str(uuid.uuid4())
        try:
            self.warehouseStore.add(client_id, warehouse_id, random_str, random_str)
            self.locationStore.add(
                client_id, 
                location_id,
                warehouse_id,
                random_str,
                random_str,
                random_str,
                random_str,
                random_str,
                random_str 
            )
        except Exception as e:
            self.fail(e)