import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore

from uuid import UUID


class VendorStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(VendorStore, self).__init__(manager, name)

    def add(self, client_id: UUID, vendor_id: UUID, name: str, address: str, country_id: int):
        try:
            super(VendorStore, self).runProcTransactional('inventory.vendor_add', [
                client_id,
                vendor_id,
                name,
                address,
                country_id
            ])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to add vendor')

    def filter(self, client_id: UUID, filter: str):
        try:
            result = super(VendorStore, self).runProc('inventory.vendors_filter', [
                client_id,
                f'%{filter}%'
            ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve vendors')

    def get(self, client_id: UUID, vendor_id: UUID):
        try:
            [result, ] = super(VendorStore, self).runProc('inventory.vendor_get', [
                client_id,
                vendor_id
            ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve vendor')
        