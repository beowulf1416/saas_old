import unittest

from pyramid import testing

import string
import random


class TestAccountStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.core.stores.clients import ClientStore
        from saas.app.modules.accounting.stores.accounts import AccountsStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.clientStore = ClientStore(self.mgr, 'default')
        self.accountsStore = AccountsStore(self.mgr, 'default')
    
    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_account_add(self):
        [(client_id,  = self.clientStore.getDefaultClient()

        result = self.accountsStore.add('')