import unittest

from pyramid import testing

import string
import random
import uuid


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

        self.defaultClient = self.clientStore.getDefaultClient()

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_save_po(self):
        random_str = self.generate_random_str(10)
        (client_id, active, name, address, country_id)  = self.clientStore.getDefaultClient()
        warehouse_id = self.warehouseStore.add(client_id, random_str, random_str)
        po_id = str(uuid.uuid4())
        order = {
            'clientId': client_id,
            'purchaseOrderId': po_id,
            'description': random_str,
            'warehouseId': warehouse_id,
            'instructions': random_str,
            'items': [
                {
                    'description': random_str,
                    'quantity': 1,
                    'uom': 1
                }
            ]
        }
        self.poStore.save(order)

    def test_filter_po(self):
        try:
            (client_id, active, name, address, country_id)  = self.clientStore.getDefaultClient()

            random_str = self.generate_random_str(10)
            warehouse_id = self.warehouseStore.add(client_id, random_str, random_str)
            po_id = str(uuid.uuid4())
            order = {
                'clientId': client_id,
                'purchaseOrderId': po_id,
                'description': random_str,
                'warehouseId': warehouse_id,
                'instructions': random_str,
                'items': [
                    {
                        'description': random_str,
                        'quantity': 1,
                        'uom': 1
                    }
                ]
            }
            self.poStore.save(order)

            result = self.poStore.filter(client_id, '')
            self.assertGreater(len(result), 0, '{0}'.format(result))
        except Exception as e:
            self.fail(e)


    def test_get(self):
        client_id = self.defaultClient[0]
        random_str = self.generate_random_str(10)
        warehouse_id = self.warehouseStore.add(client_id, random_str, random_str)
        po_id = str(uuid.uuid4())
        order = {
            'clientId': client_id,
            'purchaseOrderId': po_id,
            'description': random_str,
            'warehouseId': warehouse_id,
            'instructions': random_str,
            'items': [
                {
                    'description': random_str,
                    'quantity': 1,
                    'uom': 1
                }
            ]
        }
        self.poStore.save(order)
        try:
            result = self.poStore.get(client_id, po_id)
            self.assertEqual(result[0], po_id, '{0}'.format(result))
        except Exception as e:
            self.fail(e)


    def test_get_items(self):
        client_id = self.defaultClient[0]
        random_str = self.generate_random_str(10)
        warehouse_id = self.warehouseStore.add(client_id, random_str, random_str)
        po_id = str(uuid.uuid4())
        order = {
            'clientId': client_id,
            'purchaseOrderId': po_id,
            'description': random_str,
            'warehouseId': warehouse_id,
            'instructions': random_str,
            'items': [
                {
                    'description': random_str,
                    'quantity': 1,
                    'uom': 1
                }
            ]
        }
        self.poStore.save(order)
        try:
            result = self.poStore.get_items(client_id, po_id)
            self.assertGreater(len(result), 0, '{0}'.format(result))
        except Exception as e:
            self.fail(e)