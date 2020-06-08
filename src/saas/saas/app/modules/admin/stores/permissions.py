import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore


class PermissionsStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(PermissionsStore, self).__init__(manager, name)

    def all(self):
        try:
            result = super(PermissionsStore, self).runProc('iam.permissions_all', [])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve permissions')

    def filter(self, filter: str):
        try:
            result = super(PermissionsStore, self).runProc('iam.permissions_filter', 
                ['%{0}%'.format(filter), ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve permissions')