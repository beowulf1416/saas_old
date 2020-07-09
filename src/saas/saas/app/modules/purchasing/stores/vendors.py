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
            super(VendorStore, self).runProcTransactional('purchasing.vendor_add', [
                client_id,
                vendor_id,
                name,
                address,
                country_id
            ])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to add vendor')

    def assignOrganization(self, client_id: UUID, vendor_id: UUID, organization_id: UUID):
        try:
            super(VendorStore, self).runProcTransactional('purchasing.vendor_assign_org', [
                client_id,
                vendor_id,
                organization_id
            ])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to assign organization as vendor')

    def filter(self, client_id: UUID, filter: str):
        try:
            result = super(VendorStore, self).runProc('purchasing.vendors_filter', [
                client_id,
                f'%{filter}%'
            ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve vendors')

    def get(self, client_id: UUID, vendor_id: UUID):
        try:
            [result, ] = super(VendorStore, self).runProc('purchasing.vendor_get', [
                client_id,
                vendor_id
            ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve vendor')
        