import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore, StoreException

from uuid import UUID


class GroupStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(GroupStore, self).__init__(manager, name)

    def add(self, client_id: UUID, group_id: UUID, name: str, description: str):
        try:
            super(GroupStore, self).runProcTransactional('accounting.account_group_add', [
                client_id,
                group_id,
                name,
                description
            ])
        except Exception as e:
            log.error(e)
            raise StoreException(e)

    def assignParent(self, client_id: UUID, group_id: UUID, parent_group_id: UUID):
        try:
            super(GroupStore, self).runProcTransactional('accounting.account_group_assign_parent', [
                client_id,
                group_id,
                parent_group_id
            ])
        except Exception as e:
            log.error(e)
            raise StoreException(e)

    def tree(self, client_id: UUID):
        try:
            result = super(GroupStore, self).runProc('accounting.account_group_tree', [
                client_id,
            ])
            return result
        except Exception as e:
            log.error(e)
            raise StoreException('Unable to retrieve account group tree')

    def accounts(self, client_id: UUID, group_id: UUID) -> []:
        try:
            result = super(GroupStore, self).runProc('accounting.account_group_accounts', [
                client_id,
                group_id
            ])
            return result
        except Exception as e:
            log.error(e)
            raise StoreException('Unable to retrieve account group accounts')