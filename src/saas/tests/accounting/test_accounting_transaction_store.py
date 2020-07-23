import unittest

from pyramid import testing

import string
import random
import uuid


class TestTransactionStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.core.stores.client import ClientStore
        from saas.app.modules.accounting.stores.accounts import AccountsStore
        from saas.app.modules.accounting.stores.transactions import TransactionStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.clientStore = ClientStore(self.mgr, 'default')
        self.accountsStore = AccountsStore(self.mgr, 'default')
        self.transactionStore = TransactionStore(self.mgr, 'default')

        self.defaultClient = self.clientStore.getDefaultClient()
    
    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_transaction_add(self):
        client_id = self.defaultClient[0]
        transaction_id = str(uuid.uuid4())

        transaction = {
            'clientId': client_id,
            'transactionId': transaction_id,
            
        }