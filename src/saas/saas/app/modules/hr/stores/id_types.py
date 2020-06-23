import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore

from uuid import UUID


class IdTypesStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(IdTypesStore, self).__init__(manager, name)

    def all(self):
        try:
            result = super(IdTypesStore, self).runProc('crm.id_types_all', [])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve id types')