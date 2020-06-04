import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore


class UOMStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(UOMStore, self).__init__(manager, name)


    def all(self):
        try:
            return super(UOMStore, self).runProc('common.uom_all', [])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve all units of measure')