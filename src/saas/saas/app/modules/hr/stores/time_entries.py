import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore

import uuid
from uuid import UUID
import datetime
# from typing import List


class TimeEntriesStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(TimeEntriesStore, self).__init__(manager, name)

    def save(self, clientId: UUID, memberId: UUID, entries: list):
        cn = super(TimeEntriesStore, self).begin()
        try:
            c = cn.cursor()
            for entry in entries['entries']:
                entryId = entry['timeEntryId'] if 'timeEntryId' in entry else str(uuid.uuid4())
                c.callproc('hr.time_entry_save', [
                    clientId,
                    memberId,
                    entryId,
                    entry['start'],
                    entry['end'],
                    entry['hours']
                ])
            super(TimeEntriesStore, self).commit(cn)
        except Exception as e:
            log.error(e)
            super(TimeEntriesStore, self).rollback(cn)
            raise Exception('Unable to save time entries')