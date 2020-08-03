import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore, StoreException

from uuid import UUID


class FacilityStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(FacilityStore, self).__init__(manager, name)

    def add(self, 
        client_id: UUID, 
        facility_id: UUID, 
        name: str, 
        description: str,
        address: str,
        country_id: int,
        area: float,
        area_uom_id: int) -> None:
        try:
            super(FacilityStore, self).runProcTransactional('inventory.facility_add', [
                client_id,
                facility_id,
                name,
                description,
                address,
                country_id,
                area,
                area_uom_id
            ])
        except Exception as e:
            log.error(e)
            raise StoreException('Unable to add facility')

    def update(self,
        client_id: UUID, 
        facility_id: UUID, 
        name: str, 
        description: str,
        address: str,
        country_id: int,
        area: float,
        area_uom_id: int) -> None:
        try:
            super(FacilityStore, self).runProcTransactional('inventory.facility_update', [
                client_id,
                facility_id,
                name,
                description,
                address,
                country_id,
                area,
                area_uom_id
            ])
        except Exception as e:
            log.error(e)
            raise StoreException('Unable to update facility')

    def filter(self, client_id: UUID, filter: str):
        try:
            return super(FacilityStore, self).runProc('inventory.facility_filter', [
                client_id,
                f'%{filter}%'
            ])
        except Exception as e:
            log.error(e)
            raise StoreException('Unable to retrieve facilities')

    def get(self, client_id: UUID, facility_id: UUID):
        try:
            result = super(FacilityStore, self).runProc('inventory.facility_get', [
                client_id,
                facility_id
            ])
            if len(result) > 0:
                return result[0]
            else:
                raise StoreException('Facility not found')
        except Exception as e:
            log.error(e)
            raise StoreException('Unable to retrieve facility')