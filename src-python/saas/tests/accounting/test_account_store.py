import unittest

from pyramid import testing

import string
import random


class TestAccountStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.core.stores.client import ClientStore
        from saas.app.modules.accounting.stores.accounts import AccountsStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.clientStore = ClientStore(self.mgr, 'default')
        self.accountsStore = AccountsStore(self.mgr, 'default')
    
    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_account_types_all (self):
        try:
            result = self.accountsStore.accountTypesAll()
            self.assertGreater(len(result), 0)
        except Exception as e:
            self.fail(e)


    def test_account_add(self):
        (client_id, active, name, address, url_name)  = self.clientStore.getDefaultClient()
        random_name = self.generate_random_str(10)

        from saas.app.modules.accounting.models.account_types import AccountTypes
        try:
            result = self.accountsStore.add(client_id, AccountTypes.ASSETS, random_name, random_name)
        except Exception as e:
            self.fail(e)

    def test_assign_parent_account(self):
        (client_id, active, name, address, url_name)  = self.clientStore.getDefaultClient()
        random_name_1 = self.generate_random_str(10)
        random_name_2 = self.generate_random_str(10)

        from saas.app.modules.accounting.models.account_types import AccountTypes
        try:
            account_1 = self.accountsStore.add(client_id, AccountTypes.ASSETS, random_name_1, random_name_1)
            account_2 = self.accountsStore.add(client_id, AccountTypes.ASSETS, random_name_2, random_name_2)
            self.accountsStore.assign_account_parent(client_id, account_1, account_2)
        except Exception as e:
            self.fail(e)
