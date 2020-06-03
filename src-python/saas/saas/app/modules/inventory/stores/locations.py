import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore

from uuid import UUID


class LocationStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(LocationStore, self).__init__(manager, name)

    def add(self, clientId: UUID, warehouseId: UUID, floor_id: str, shelf_id: str,
        rack_id: str, level_id: str, bin_id: str):
        try:
            [(location_id, )] = super(LocationStore, self).runProcTransactional(
                'inventory.location_add',
                [clientId, warehouseId, floor_id, shelf_id, rack_id, level_id, bin_id]
            )
            return location_id
        except Exception as e:
            log.error(e)
            raise Exception('Unable to add inventory location')