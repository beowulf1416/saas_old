import unittest

from pyramid import testing

import string
import random
import uuid

from saas.app.modules.accounting.models.account_types import AccountTypes


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
        currency_id = self.defaultClient[5]
        description = self.generate_random_str(10)

        account_id_1 = str(uuid.uuid4())
        account_id_2 = str(uuid.uuid4())

        account_name_1 = self.generate_random_str(10)
        account_name_2 = self.generate_random_str(10)

        self.accountsStore.add(client_id, account_id_1, AccountTypes.ASSETS, account_name_1, account_name_1)
        self.accountsStore.add(client_id, account_id_2, AccountTypes.ASSETS, account_name_2, account_name_2)

        transaction = {
            'clientId': client_id,
            'transactionId': transaction_id,
            'description': description,
            'currencyId': currency_id,
            'entries': [
                {
                    'itemId': str(uuid.uuid4()),
                    'accountId': account_id_1,
                    'debit': 100,
                    'credit': 0
                },
                {
                    'itemId': str(uuid.uuid4()),
                    'accountId': account_id_2,
                    'debit': 0,
                    'credit': 100
                }
            ]
        }

        try:
            self.transactionStore.add(transaction)
        except Exception as e:
            self.fail(e)