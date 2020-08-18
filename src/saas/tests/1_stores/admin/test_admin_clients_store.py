import unittest

from pyramid import testing

import string
import random
import uuid


class TestAdminClientStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.modules.admin.stores.clients import ClientsStore
        from saas.app.core.stores.client import ClientStore
        from saas.app.core.stores.user import UserStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.clientStore = ClientsStore(self.mgr, 'default')
        self.cStore = ClientStore(self.mgr, 'default')
        self.userStore = UserStore(self.mgr, 'default')

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_get_all_clients(self):
        result = self.clientStore.getAll()
        self.assertNotEqual(0, len(result), '{0}'.format(result))

    def test_add_client(self):
        random_name = self.generate_random_str(10)
        client_id = str(uuid.uuid4())
        country_id = 608 # philippines
        currency_id = 108 # philippine peso
        try:
            self.clientStore.add(client_id, random_name, random_name, country_id, currency_id)
        except Exception as e:
            self.fail(e)

    def test_update_client(self):
        random_name = self.generate_random_str(10)
        client_id = str(uuid.uuid4())
        country_id = 608 # philippines
        currency_id = 108 # philippine peso
        try:
            self.clientStore.add(client_id, random_name, random_name, country_id, currency_id)
            self.clientStore.update(client_id, random_name, random_name, country_id, currency_id)
        except Exception as e:
            self.fail(e)


    def test_add_client_not_unique(self):
        random_name = self.generate_random_str(10)
        client_id = str(uuid.uuid4())
        country_id = 608 # philippines
        currency_id = 108 # philippine peso
        self.clientStore.add(client_id, random_name, random_name, country_id, currency_id)
        client_id2 = str(uuid.uuid4())
        self.assertRaises(
            Exception,
            self.clientStore.add,
            client_id2,
            random_name,
            random_name,
            random_name,
            country_id,
            currency_id
        )

    def test_get_client(self):
        random_name = self.generate_random_str(10)
        client_id = str(uuid.uuid4())
        country_id = 608 # philippines
        currency_id = 108 # philippine peso
        self.clientStore.add(client_id, random_name, random_name, country_id, currency_id)
        try:
            client = self.clientStore.get(client_id)
            self.assertEqual(client_id, client[0], '{0}'.format(client))
        except Exception as e:
            self.fail(e)

    def test_set_active(self):
        random_name = self.generate_random_str(10)
        client_id = str(uuid.uuid4())
        country_id = 608 # philippines
        currency_id = 108 # philippine peso
        self.clientStore.add(client_id, random_name, random_name, country_id, currency_id)
        try:
            self.clientStore.setActive(client_id, False)
        except Exception as e:
            self.fail(e)

    def test_filter(self):
        try:
            result = self.clientStore.filter('defau')
            self.assertGreater(len(result), 0)
        except Exception as e:
            self.fail(e)

    def test_client_join(self) -> None:
        random_name = self.generate_random_str(10)
        client_id = str(uuid.uuid4())
        country_id = 608 # philippines
        currency_id = 108 # philippine peso
        self.clientStore.add(
            client_id, 
            random_name, 
            random_name, 
            country_id, 
            currency_id
        )
        
        random_name = self.generate_random_str(10)
        user_id = uuid.uuid4()
        email = '{0}@{1}.com'.format(random_name, random_name)
        self.userStore.userAdd(
            user_id, 
            email, 
            random_name
        )

        try:
            self.cStore.join(
                client_id,
                user_id
            )
        except Exception as e:
            self.fail(e)