import unittest

from pyramid import testing

import string
import random


class TestPurchaseOrderStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.core.stores.client import ClientStore
        from saas.app.modules.purchasing.stores.purchase_order import PurchaseOrderStore
        from saas.app.modules.inventory.stores.warehouses import WarehouseStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.clientStore = ClientStore(self.mgr, 'default')
        self.poStore = PurchaseOrderStore(self.mgr, 'default')
        self.warehouseStore = WarehouseStore(self.mgr, 'default')

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def save_po(self):
        random_str = self.generate_random_str(10)
        (client_id, active, name, address, country_id)  = self.clientStore.getDefaultClient()
        [(warehouse_id, ), ] = self.warehouseStore.add(client_id, random_str, random_str)
        order = {
            'clientId': client_id,
            'description': random_str,
            'warehouseId': warehouse_id,
            'items': [
                {
                    'description': random_str,
                    'quantity': 1,
                    'uom': 1
                }
            ]
        }
        po_id = self.poStore.save(order)
        self.assertFalse(po_id is None)

    def filter_po(self):
        (client_id, active, name, address, country_id)  = self.clientStore.getDefaultClient()
        result = self.poStore.filter(client_id, '')
        self.assertGreater(len(result), 0, '{0}'.format(result))