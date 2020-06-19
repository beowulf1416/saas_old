import unittest

from pyramid import testing

import string
import random
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

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_location_add(self):
        random_str = self.generate_random_str(10)
        (client_id, active, name, address, country_id)  = self.clientStore.getDefaultClient()
        try:
            warehouse_id = self.warehouseStore.add(client_id, random_str, random_str)
            location_id = self.locationStore.add(
                client_id, 
                warehouse_id,
                random_str,
                random_str,
                random_str,
                random_str,
                random_str 
            )
            test = UUID(location_id)
        except Exception as e:
            self.fail(e)