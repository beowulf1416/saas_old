import unittest

from pyramid import testing

import string
import random
import uuid

import logging
log = logging.getLogger(__name__)


class TestHRIdTypesStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.modules.hr.stores.id_types import IdTypesStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.idStore = IdTypesStore(self.mgr, 'default')

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_all(self):
        try:
            types = self.idStore.all()
            self.assertGreater(len(types), 0, '{0}'.format(types))
        except Exception as e:
            self.fail(e)