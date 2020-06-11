import unittest

from pyramid import testing

import string
import random


class TestInventoryItemsStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.modules.inventory.stores.items import ItemsStore
        from saas.app.core.stores.client import ClientStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.itemsStore = ItemsStore(self.mgr, 'default')
        self.clientStore = ClientStore(self.mgr, 'default')

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_item_add(self):
        random_str = self.generate_random_str(10)
        (client_id, active, name, address)  = self.clientStore.getDefaultClient()
        try:
            result = self.itemsStore.add(
                client_id,
                {
                    'name': random_str,
                    'description': random_str,
                    'make': random_str,
                    'brand': random_str,
                    'model': random_str,
                    'version': random_str,
                    'sku': random_str,
                    'upc': random_str,
                    'length': 1,
                    "length_unit_id": 1,
                    'width': 1,
                    "width_unit_id": 1,
                    'height': 1,
                    "height_unit_id": 1,
                    'weight': 1,
                    "weight_unit_id": 1,
                    'perishable': True,
                    'hazardous': False
                }
            )
        except Exception as e:
            self.fail(e)

    def test_item_add_substitute(self):
        item_1 = self.generate_random_str(10)
        item_2 = self.generate_random_str(10)
        (client_id, active, name, address)  = self.clientStore.getDefaultClient()
        try:
            item_id_1 = self.itemsStore.add(
                client_id,
                {
                    'name': item_1,
                    'description': item_1,
                    'make': item_1,
                    'brand': item_1,
                    'model': item_1,
                    'version': item_1,
                    'sku': item_1,
                    'upc': item_1,
                    'length': 1,
                    'width': 1,
                    'height': 1,
                    'weight': 1,
                    'perishable': True,
                    'hazardous': False
                }
            )
            item_id_2 = self.itemsStore.add(
                client_id,
                {
                    'name': item_2,
                    'description': item_2,
                    'make': item_2,
                    'brand': item_2,
                    'model': item_2,
                    'version': item_2,
                    'sku': item_2,
                    'upc': item_2,
                    'length': 1,
                    'width': 1,
                    'height': 1,
                    'weight': 1,
                    'perishable': True,
                    'hazardous': False
                }
            )

            self.itemsStore.addSubstitute(client_id, item_id_1, item_id_2)
        except Exception as e:
            self.fail(e)

    def test_item_substitutes(self):
        item_1 = self.generate_random_str(10)
        item_2 = self.generate_random_str(10)
        (client_id, active, name, address)  = self.clientStore.getDefaultClient()
        try:
            item_id_1 = self.itemsStore.add(
                client_id,
                {
                    'name': item_1,
                    'description': item_1,
                    'make': item_1,
                    'brand': item_1,
                    'model': item_1,
                    'version': item_1,
                    'sku': item_1,
                    'upc': item_1,
                    'length': 1,
                    'width': 1,
                    'height': 1,
                    'weight': 1,
                    'perishable': True,
                    'hazardous': False
                }
            )
            item_id_2 = self.itemsStore.add(
                client_id,
                {
                    'name': item_2,
                    'description': item_2,
                    'make': item_2,
                    'brand': item_2,
                    'model': item_2,
                    'version': item_2,
                    'sku': item_2,
                    'upc': item_2,
                    'length': 1,
                    'width': 1,
                    'height': 1,
                    'weight': 1,
                    'perishable': True,
                    'hazardous': False
                }
            )

            self.itemsStore.addSubstitute(client_id, item_id_1, item_id_2)

            result = self.itemsStore.substitutes(client_id, item_id_1)
            self.assertGreater(len(result), 0, '{0}'.format(result))
        except Exception as e:
            self.fail(e)