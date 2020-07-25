import unittest

from pyramid import testing

import string
import random
import uuid

from saas.app.modules.accounting.models.account_types import AccountTypes


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

        self.defaultClient = self.clientStore.getDefaultClient()
    
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
        client_id = self.defaultClient[0]
        account_id = str(uuid.uuid4())
        random_name = self.generate_random_str(10)

        try:
            self.accountsStore.add(client_id, account_id, AccountTypes.ASSETS, random_name, random_name)
        except Exception as e:
            self.fail(e)

    def test_account_get(self):
        client_id = self.defaultClient[0]
        account_id = str(uuid.uuid4())
        random_name = self.generate_random_str(10)
        self.accountsStore.add(client_id, account_id, AccountTypes.ASSETS, random_name, random_name)
        
        try:
            result = self.accountsStore.get(client_id, account_id)
            self.assertEqual(result[0], account_id, '{0}'.format(result))
        except Exception as e:
            self.fail(e)

    def test_accounts_all(self):
        client_id = self.defaultClient[0]
        try:
            result = self.accountsStore.all(client_id)
            self.assertGreater(len(result), 0)
        except Exception as e:
            self.fail(e)


    # def test_assign_parent_account(self):
    #     client_id = self.defaultClient[0]
    #     random_name_1 = self.generate_random_str(10)
    #     random_name_2 = self.generate_random_str(10)

    #     from saas.app.modules.accounting.models.account_types import AccountTypes
    #     try:
    #         account_1 = self.accountsStore.add(client_id, AccountTypes.ASSETS, random_name_1, random_name_1)
    #         account_2 = self.accountsStore.add(client_id, AccountTypes.ASSETS, random_name_2, random_name_2)
    #         self.accountsStore.assign_account_parent(client_id, account_1, account_2)
    #     except Exception as e:
    #         self.fail(e)

    # def test_account_tree_all(self):
    #     (client_id, active, name, address, country_id)  = self.clientStore.getDefaultClient()
    #     try:
    #         result = self.accountsStore.getTree(client_id)
    #     except Exception as e:
    #         self.fail(e)

    def test_account_filter(self):
        client_id = self.defaultClient[0]
        account_id = str(uuid.uuid4())
        random_name = self.generate_random_str(10)

        from saas.app.modules.accounting.models.account_types import AccountTypes
        try:
            self.accountsStore.add(client_id, account_id, AccountTypes.ASSETS, random_name, random_name)
            result = self.accountsStore.filter(client_id, random_name[1:len(random_name)-1])
            self.assertGreater(len(result), 0, '{0}'.format(result))
        except Exception as e:
            self.fail(e)