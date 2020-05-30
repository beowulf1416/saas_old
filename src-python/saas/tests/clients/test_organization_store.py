import unittest

from pyramid import testing

import string
import random


class TestOrganizationsStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.core.stores.client import ClientStore
        from saas.app.modules.clients.stores.organizations import OrganizationsStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.clientStore = ClientStore(self.mgr, 'default')
        self.orgStore = OrganizationsStore(self.mgr, 'default')

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_add_organization(self):
        org_name = self.generate_random_str(10)
        (client_id, active, name, address, url_name) = self.clientStore.getDefaultClient()
        try:
            result = self.orgStore.add(client_id, org_name, org_name)
        except Exception as e:
            self.fail(e)

    def test_get_organization(self):
        org_name = self.generate_random_str(10)
        (client_id, active, name, address, url_name) = self.clientStore.getDefaultClient()
        try:
            org_id = self.orgStore.add(client_id, org_name, org_name)
            [t_org_id, active, name, description] = self.orgStore.get(org_id)
            self.assertEqual(org_id, t_org_id)
        except Exception as e:
            self.fail(e)

    def test_get_root_organization(self):
        (client_id, active, name, address, url_name) = self.clientStore.getDefaultClient()
        try:
            result = self.orgStore.getRoot(client_id)
        except Exception as e:
            self.fail(e)

    def test_set_parent_organization(self):
        org_name_1 = self.generate_random_str(10)
        org_name_2 = self.generate_random_str(10)
        (client_id, active, name, address, url_name) = self.clientStore.getDefaultClient()
        try:
            org_id_1 = self.orgStore.add(client_id, org_name_1, org_name_1)
            org_id_2 = self.orgStore.add(client_id, org_name_2, org_name_2)
            self.orgStore.setParentOrg(client_id, org_id_1, org_id_2)
        except Exception as e:
            self.fail(e)

    def test_get_tree(self):
        (client_id, active, name, address, url_name) = self.clientStore.getDefaultClient()
        try:
            result = self.orgStore.tree(client_id)
        except Exception as e:
            self.fail(e)