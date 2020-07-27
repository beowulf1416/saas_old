import unittest

from pyramid import testing

import string
import random
import uuid

from saas.app.core.stores.base import StoreException


class TestAccountGroupStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.core.stores.client import ClientStore
        from saas.app.modules.accounting.stores.accounts import AccountsStore
        from saas.app.modules.accounting.stores.groups import GroupStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.clientStore = ClientStore(self.mgr, 'default')
        self.groupStore = GroupStore(self.mgr, 'default')
        self.accountsStore = AccountsStore(self.mgr, 'default', self.groupStore)

        self.defaultClient = self.clientStore.getDefaultClient()
    
    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_group_add(self):
        client_id = self.defaultClient[0]
        group_id = str(uuid.uuid4())
        random_str = self.generate_random_str(10)
        try:
            self.groupStore.add(client_id, group_id, random_str, random_str)
        except StoreException as e:
            self.fail(e)

    def test_assign_parent(self):
        client_id = self.defaultClient[0]

        group_id_1 = str(uuid.uuid4())
        random_str_1 = self.generate_random_str(10)

        group_id_2 = str(uuid.uuid4())
        random_str_2 = self.generate_random_str(10)
        try:
            self.groupStore.add(client_id, group_id_1, random_str_1, random_str_1)
            self.groupStore.add(client_id, group_id_2, random_str_2, random_str_2)

            self.groupStore.assignParent(client_id, group_id_1, group_id_2)
        except StoreException as e:
            self.fail(e)

    def test_tree(self):
        client_id = self.defaultClient[0]
        try:
            result = self.groupStore.tree(client_id)
            self.assertGreater(len(result), 0, '{0}'.format(result))
        except StoreException as e:
            self.fail(e)
