import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore, StoreException

from uuid import UUID
from typing import List


class RolesStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(RolesStore, self).__init__(manager, name)

    def getAll(self, client_id: UUID):
        try:
            result = super(RolesStore, self).runProc('iam.client_roles_all', [
                str(client_id),
            ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve all roles')

    def filter(self, client_id: UUID, filter: str):
        try:
            result = super(RolesStore, self).runProc('iam.clients_roles_filter', [
                str(client_id),
                '%{0}%'.format(filter)
            ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to filter roles')


    def add(self, client_id: UUID, role_id: UUID, name: str) -> None:
        try:
            super(RolesStore, self).runProcTransactional('iam.role_add', [
                str(client_id), 
                str(role_id), 
                name
            ])
        except Exception as e:
            log.error(e)
            raise StoreException('Unable to add client role')

    def setActive(self, role_id: UUID, active: bool):
        try:
            super(RolesStore, self).runProcTransactional('iam.role_set_active', [
                str(role_id), 
                active
            ])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to set role active state')

    def permissions(self, client_id: UUID, role_id: UUID):
        try:
            result = super(RolesStore, self).runProc('iam.permissions_role', [
                str(client_id),
                str(role_id)
            ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve permissions granted to role')


    def assignPermissions(self, client_id: UUID, role_id: UUID, permission_ids: List[UUID]):
        cn = super(RolesStore, self).begin()
        try:
            for permissionId in permissionIds:
                c = cn.cursor()
                c.callproc('iam.permissions_role_assign', [
                    str(client_id), 
                    str(role_id), 
                    str(permission_ids)
                ])
            super(RolesStore, self).commit(cn)
        except Exception as e:
            log.error(e)
            super(RolesStore, self).rollback(cn)
            raise Exception('Unable to grant permissions to role')

    def removePermission(self, client_id: UUID, role_id: UUID, permission_id: UUID):
        try:
            super(RolesStore, self).runProcTransactional('iam.permissions_role_revoke', [
                str(client_id),
                str(roleId),
                str(permission_id)
            ])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to revoke permissions to role')