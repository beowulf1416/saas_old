import unittest

from pyramid import testing

import string
import random
import uuid

import logging
log = logging.getLogger(__name__)


class TestPurchasingVendorStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.core.stores.client import ClientStore
        from saas.app.modules.purchasing.stores.vendors import VendorStore
        from saas.app.modules.crm.stores.organizations import OrganizationStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.clientStore = ClientStore(self.mgr, 'default')
        self.defaultClient = self.clientStore.getDefaultClient()
        self.vStore = VendorStore(self.mgr, 'default')
        self.orgStore = OrganizationStore(self.mgr, 'default')

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_add(self):
        client_id = self.defaultClient[0]
        random_str = self.generate_random_str(10)
        vendor_id = str(uuid.uuid4())
        try:
            self.vStore.add(client_id, vendor_id, random_str, random_str, 1)
        except Exception as e:
            self.fail(e)

    def test_update(self):
        client_id = self.defaultClient[0]
        random_str = self.generate_random_str(10)
        vendor_id = str(uuid.uuid4())
        try:
            self.vStore.add(client_id, vendor_id, random_str, random_str, 1)
            random_str = self.generate_random_str(10)
            self.vStore.update(client_id, vendor_id, random_str, random_str, 608)
        except Exception as e:
            self.fail(e)


    def test_assign_organization(self):
        client_id = self.defaultClient[0]
        random_str = self.generate_random_str(10)
        vendor_id = str(uuid.uuid4())
        organization_id = str(uuid.uuid4())
        try:
            self.orgStore.save(client_id, organization_id, random_str, random_str, 608)
            self.vStore.assignOrganization(client_id, vendor_id, organization_id)
        except Exception as e:
            self.fail(e)


    def test_filter(self):
        client_id = self.defaultClient[0]
        random_str = self.generate_random_str(10)
        org_id = str(uuid.uuid4())
        try:
            self.vStore.add(client_id, org_id, random_str, random_str, 1)
            result = self.vStore.filter(client_id, '')
            self.assertGreater(len(result), 0, '{0}'.format(result))
        except Exception as e:
            self.fail(e)

    def test_get(self):
        client_id = self.defaultClient[0]
        random_str = self.generate_random_str(10)
        org_id = str(uuid.uuid4())
        try:
            self.vStore.add(client_id, org_id, random_str, random_str, 1)
            result = self.vStore.get(client_id, org_id)
            self.assertEqual(result[0], org_id, '{0}'.format(result))
        except Exception as e:
            self.fail(e)