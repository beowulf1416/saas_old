import unittest

from pyramid import testing

import string
import random


class TestAdminPermissionStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.modules.admin.stores.permissions import PermissionsStore
        from saas.app.core.stores.client import ClientStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.permissionStore = PermissionsStore(self.mgr, 'default')
        self.clientStore = ClientStore(self.mgr, 'default')

    def test_get_all(self):
        try:
            result = self.permissionStore.all()
            self.assertNotEqual(0, len(result), '{0}'.format(len(result)))
        except Exception as e:
            self.fail(e)

    def test_filter(self):
        try:
            result = self.permissionStore.filter('admin')
            self.assertNotEqual(0, len(result), '{0}'.format(len(result)))
        except Exception as e:
            self.fail(e)