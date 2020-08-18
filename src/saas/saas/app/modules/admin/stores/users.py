import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore, StoreException

from uuid import UUID
from typing import List


class UsersStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(UsersStore, self).__init__(manager, name)

    def getAllClientUsers(self, clientId: UUID):
        try:
            result = super(UsersStore, self).runProc('iam.client_users_all', [clientId, ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve client users')

    def addClientUsers(self, clientId: UUID, userIds: List[UUID]):
        cn = super(UsersStore, self).begin()
        try:
            for userId in userIds:
                c = cn.cursor()
                c.callproc('iam.client_user_add', [
                    clientId, 
                    userId
                ])
            super(UsersStore, self).commit(cn)
        except Exception as e:
            log.error(e)
            super(UsersStore, self).rollback(cn)
            raise Exception('Unable to assign user to client')

    def removeClientUser(self, clientId: UUID, userId: UUID):
        try:
            super(UsersStore, self).runProcTransactional('iam.client_user_remove', [clientId, userId])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to remove client user')

    def client_user_set_active(self, client_id: UUID, user_id: UUID, active: bool) -> None:
        try:
            super(UsersStore, self).runProcTransactional('iam.client_user_set_active', [
                str(client_id),
                str(user_id),
                active
            ])
        except Exception as e:
            log.error(e)
            raise StoreException('Unable to set client user to active')

    def clientRoles(self, clientId: UUID, userId: UUID):
        try:
            result = super(UsersStore, self).runProc('iam.client_user_roles', [clientId, userId])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve client roles')

    def addClientUserRoles(self, clientId: UUID, userId: UUID, roleIds: list):
        cn = super(UsersStore, self).begin()
        try:
            for roleId in roleIds:
                c = cn.cursor()
                c.callproc('iam.role_assign_user', [clientId, roleId, userId])
            super(UsersStore, self).commit(cn)
        except Exception as e:
            log.error(e)
            super(UsersStore, self).rollback(cn)
            raise Exception('Unable to assign roles to user')

    def removeClientUserRole(self, clientId: UUID, userId: UUID, roleId: UUID):
        try:
            super(UsersStore, self).runProcTransactional('iam.role_remove_user', [clientId, roleId, userId])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to remove role from user')

    def filter(self, filter: str):
        try:
            result = super(UsersStore, self).runProc('iam.users_filter', 
                ['%{0}%'.format(filter), ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to filter users')
