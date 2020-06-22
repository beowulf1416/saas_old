import unittest

from pyramid import testing

import string
import random
import uuid

import logging
log = logging.getLogger(__name__)


class TestHRMembersStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.modules.hr.stores.members import MembersStore
        from saas.app.core.stores.client import ClientStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.mStore = MembersStore(self.mgr, 'default')
        self.clientStore = ClientStore(self.mgr, 'default')
        self.defaultClient = self.clientStore.getDefaultClient()

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_save(self):
        random_str = self.generate_random_str(10)
        try:
            member_id = str(uuid.uuid4())

            self.mStore.save({
                'clientId': self.defaultClient[0],
                'memberId': member_id,
                'firstName': random_str,
                'middleName': random_str,
                'lastName': random_str,
                'prefix': random_str,
                'suffix': random_str
            })
        except Exception as e:
            self.fail(e)

    def test_get(self):
        random_str = self.generate_random_str(10)
        try:
            client_id = self.defaultClient[0]
            member_id = str(uuid.uuid4())

            self.mStore.save({
                'clientId': client_id,
                'memberId': member_id,
                'firstName': random_str,
                'middleName': random_str,
                'lastName': random_str,
                'prefix': random_str,
                'suffix': random_str
            })
            result = self.mStore.get(client_id, member_id)
            self.assertEqual(result[0], member_id)
        except Exception as e:
            self.fail(e)

    def test_filter(self):
        random_str = self.generate_random_str(10)
        try:
            member_id = str(uuid.uuid4())
            client_id = self.defaultClient[0]

            self.mStore.save({
                'clientId': client_id,
                'memberId': member_id,
                'firstName': random_str,
                'middleName': random_str,
                'lastName': random_str,
                'prefix': random_str,
                'suffix': random_str
            })
            result = self.mStore.filter(client_id, random_str)
            self.assertGreater(len(result), 0, '{0}'.format(result))
        except Exception as e:
            self.fail(e)