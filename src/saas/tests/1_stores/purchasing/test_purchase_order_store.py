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
        from saas.app.modules.inventory.stores.facility import FacilityStore
        from saas.app.modules.purchasing.stores.vendors import VendorStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.clientStore = ClientStore(self.mgr, 'default')
        self.poStore = PurchaseOrderStore(self.mgr, 'default')
        self.facilityStore = FacilityStore(self.mgr, 'default')
        self.vendorStore = VendorStore(self.mgr, 'default')
        
        self.defaultClient = self.clientStore.getDefaultClient()

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_save_po(self):
        random_str = self.generate_random_str(10)
        client_id = self.defaultClient[0]
        country_id = self.defaultClient[4]

        facility_id = str(uuid.uuid4())
        uom_id = 1 #
        self.facilityStore.add(
            client_id,
            facility_id,
            random_str,
            random_str,
            random_str,
            country_id,
            100,
            uom_id
        )

        vendor_id = str(uuid.uuid4())
        vendor = self.vendorStore.add(client_id, vendor_id, random_str, random_str, country_id)

        po_id = str(uuid.uuid4())
        order = {
            'clientId': client_id,
            'purchaseOrderId': po_id,
            'description': random_str,
            'facilityId': facility_id,
            'vendorId': vendor_id,
            'instructions': random_str,
            'items': [
                {
                    'id': str(uuid.uuid4()),
                    'description': random_str,
                    'quantity': 1,
                    'uom': 1,
                    'status': 'new'
                }
            ]
        }
        self.poStore.save(order)

    def test_filter_po(self):
        try:
            client_id = self.defaultClient[0]
            country_id = self.defaultClient[4]

            random_str = self.generate_random_str(10)
            facility_id = str(uuid.uuid4())
            uom_id = 1 #
            self.facilityStore.add(
                client_id,
                facility_id,
                random_str,
                random_str,
                random_str,
                country_id,
                100,
                uom_id
            )

            vendor_id = str(uuid.uuid4())
            vendor = self.vendorStore.add(client_id, vendor_id, random_str, random_str, country_id)

            po_id = str(uuid.uuid4())
            order = {
                'clientId': client_id,
                'purchaseOrderId': po_id,
                'description': random_str,
                'facilityId': facility_id,
                'vendorId': vendor_id,
                'instructions': random_str,
                'items': [
                    {
                        'id': str(uuid.uuid4()),
                        'description': random_str,
                        'quantity': 1,
                        'uom': 1,
                        'status': 'new'
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
        country_id = self.defaultClient[4]
        random_str = self.generate_random_str(10)

        facility_id = str(uuid.uuid4())
        uom_id = 1
        self.facilityStore.add(
            client_id,
            facility_id,
            random_str,
            random_str,
            random_str,
            country_id,
            100,
            uom_id
        )

        vendor_id = str(uuid.uuid4())
        vendor = self.vendorStore.add(client_id, vendor_id, random_str, random_str, country_id)

        po_id = str(uuid.uuid4())
        
        order = {
            'clientId': client_id,
            'purchaseOrderId': po_id,
            'description': random_str,
            'facilityId': facility_id,
            'vendorId': vendor_id,
            'instructions': random_str,
            'items': [
                {
                    'id': str(uuid.uuid4()),
                    'description': random_str,
                    'quantity': 1,
                    'uom': 1,
                    'status': 'new'
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
        country_id = self.defaultClient[4]
        random_str = self.generate_random_str(10)

        facility_id = str(uuid.uuid4())
        uom_id = 1 #
        self.facilityStore.add(
            client_id,
            facility_id,
            random_str,
            random_str,
            random_str,
            country_id,
            100,
            uom_id
        )
        
        vendor_id = str(uuid.uuid4())
        vendor = self.vendorStore.add(client_id, vendor_id, random_str, random_str, country_id)

        po_id = str(uuid.uuid4())
        order = {
            'clientId': client_id,
            'purchaseOrderId': po_id,
            'description': random_str,
            'facilityId': facility_id,
            'vendorId': vendor_id,
            'instructions': random_str,
            'items': [
                {
                    'id': str(uuid.uuid4()),
                    'description': random_str,
                    'quantity': 1,
                    'uom': 1,
                    'status': 'new'
                }
            ]
        }
        self.poStore.save(order)
        try:
            result = self.poStore.get_items(client_id, po_id)
            self.assertGreater(len(result), 0, '{0}'.format(result))
        except Exception as e:
            self.fail(e)