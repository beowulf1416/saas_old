import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore

from uuid import UUID


class WarehouseStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(WarehouseStore, self).__init__(manager, name)

    def add(self, clientId: UUID, name: str, address: str):
        try:
            result = super(WarehouseStore, self).runTransactional('inventory.warehouse_add', [
                clientId,
                name,
                address
            ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to add warehouse')

    def all(self, clientId: UUID):
        try:
            result = super(WarehouseStore, self).runProc('inventory.warehouses_all', [clientId, ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve warehouse records')