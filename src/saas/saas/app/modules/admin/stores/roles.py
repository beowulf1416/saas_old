import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore

from uuid import UUID
from typing import List


class RolesStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(RolesStore, self).__init__(manager, name)

    def getAll(self, clientId: UUID):
        try:
            result = super(RolesStore, self).runProc('iam.client_roles_all', [clientId, ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve all roles')

    def filter(self, clientId: UUID, filter: str):
        try:
            result = super(RolesStore, self).runProc('iam.clients_roles_filter', 
                [clientId, '%{0}%'.format(filter)])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to filter roles')


    def add(self, clientId: UUID, name: str):
        try:
            [(role_id, )] = super(RolesStore, self).runProcTransactional('iam.role_add', [clientId, name])
            return role_id
        except Exception as e:
            log.error(e)
            raise Exception('Unable to add client role')

    def setActive(self, roleId: UUID, active: bool):
        try:
            super(RolesStore, self).runProcTransactional('iam.role_set_active', [roleId, active])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to set role active state')

    def permissions(self, clientId: UUID, roleId: UUID):
        try:
            result = super(RolesStore, self).runProc('iam.permissions_role', [clientId, roleId])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve permissions granted to role')


    def assignPermissions(self, clientId: UUID, roleId: UUID, permissionIds: List[UUID]):
        cn = super(RolesStore, self).begin()
        try:
            for permissionId in permissionIds:
                c = cn.cursor()
                c.callproc('iam.permissions_role_assign', [clientId, roleId, permissionId])
            super(RolesStore, self).commit(cn)
        except Exception as e:
            log.error(e)
            super(RolesStore, self).rollback(cn)
            raise Exception('Unable to grant permissions to role')

    def removePermission(self, clientId: UUID, roleId: UUID, permissionId: UUID):
        try:
            super(RolesStore, self).runProcTransactional('iam.permissions_role_revoke', [clientId, roleId, permissionId])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to revoke permissions to role')