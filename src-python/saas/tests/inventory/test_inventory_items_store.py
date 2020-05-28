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
        (client_id, active, name, address, url_name)  = self.clientStore.getDefaultClient()
        try:
            result = self.itemsStore.add(
                client_id,
                random_str,
                random_str,
                random_str,
                random_str,
                random_str,
                random_str,
                random_str,
                random_str,
                1,
                1,
                1,
                1,
                True,
                False
            )
        except Exception as e:
            self.fail(e)