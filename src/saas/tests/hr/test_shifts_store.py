import unittest

from pyramid import testing

import string
import random
import uuid
import datetime

import logging
log = logging.getLogger(__name__)


class TestHRShiftsStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.modules.hr.stores.shifts import ShiftsStore
        from saas.app.core.stores.client import ClientStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.store = ShiftsStore(self.mgr, 'default')
        self.clientStore = ClientStore(self.mgr, 'default')
        self.defaultClient = self.clientStore.getDefaultClient()

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_save(self):
        random_str = self.generate_random_str(10)
        shift_id = str(uuid.uuid4())
        self.store.save(self.defaultClient[0], shift_id, random_str, datetime.time(8), datetime.time(12))

    def test_all(self):
        random_str = self.generate_random_str(10)
        shift_id = str(uuid.uuid4())
        self.store.save(self.defaultClient[0], shift_id, random_str, datetime.time(8), datetime.time(12))
        result = self.store.all(self.defaultClient[0])
        self.assertGreater(len(result), 0, '{0}'.format(result))