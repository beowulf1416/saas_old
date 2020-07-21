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