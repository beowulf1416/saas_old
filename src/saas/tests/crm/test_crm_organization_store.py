import unittest

from pyramid import testing

import string
import random
import uuid


class TestOrganizationStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.core.stores.client import ClientStore
        from saas.app.modules.crm.stores.organizations import OrganizationStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.clientStore = ClientStore(self.mgr, 'default')
        self.orgStore = OrganizationStore(self.mgr, 'default')

        self.defaultClient = self.clientStore.getDefaultClient()

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_save(self):
        client_id = self.defaultClient[0]
        country_id = self.defaultClient[4]
        org_id = str(uuid.uuid4())
        random_str = self.generate_random_str(10)
        self.orgStore.save(
            client_id,
            org_id,
            random_str,
            random_str,
            country_id
        )