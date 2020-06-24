import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore

from uuid import UUID
import datetime


class ShiftsStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(ShiftsStore, self).__init__(manager, name)

    def save(self, clientId: UUID, shiftId: UUID, name: str, start: datetime.time, end: datetime.time):
        try:
            super(ShiftsStore, self).runProcTransactional('hr.shift_save', [
                clientId,
                shiftId,
                name,
                start,
                end
            ])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to save shift record')

    def all(self, clientId: UUID):
        try:
            result = super(ShiftsStore, self).runProc('hr.shifts_all', [clientId, ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve shifts')