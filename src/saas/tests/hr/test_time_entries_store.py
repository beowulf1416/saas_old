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
        from saas.app.core.stores.client import ClientStore
        from saas.app.modules.hr.stores.members import MembersStore
        from saas.app.modules.hr.stores.time_entries import TimeEntriesStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.clientStore = ClientStore(self.mgr, 'default')
        self.defaultClient = self.clientStore.getDefaultClient()
        self.mStore = MembersStore(self.mgr, 'default')
        self.store = TimeEntriesStore(self.mgr, 'default')

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_save(self):
        random_str = self.generate_random_str(10)

        client_id = self.defaultClient[0]

        member_id = str(uuid.uuid4())
        self.mStore.save({
            'clientId': client_id,
            'memberId': member_id,
            'firstName': random_str,
            'middleName': random_str,
            'lastName': random_str,
            'prefix': random_str,
            'suffix': random_str,
            'identifiers': [
                {
                    'idType': 1,
                    'value': '123'
                },
                {
                    'idType': 2,
                    'value': '123'
                }
            ]
        })

        entries = []
        entries.append({
            'timeEntryId': str(uuid.uuid4()),
            'start': '2020-06-30 08:00',
            'end': '2020-06-30 12:00',
            'hours': 4
        })
        entries.append({
            'timeEntryId': str(uuid.uuid4()),
            'start': '2020-06-30 13:00',
            'end': '2020-06-30 18:00',
            'hours': 5
        })

        self.store.save(client_id, member_id, { 'entries': entries })