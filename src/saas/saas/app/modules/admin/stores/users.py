import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore


class UsersStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(UsersStore, self).__init__(manager, name)

    def getAllClientUsers(self, clientId: str):
        try:
            result = super(UsersStore, self).runProc('iam.client_users_all', [clientId, ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve client users')

    def addClientUser(self, clientId: str, userId: str):
        try:
            super(UsersStore, self).runProcTransactional('iam.client_user_add', [clientId, userId])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to add client user')

    def removeClientUser(self, clientId: str, userId: str):
        try:
            super(UsersStore, self).runProcTransactional('iam.client_user_remove', [clientId, userId])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to remove client user')

    def clientRoles(self, clientId: str, userId: str):
        try:
            result = super(UsersStore, self).runProc('iam.client_user_roles', [clientId, userId])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve client roles')

    def addClientUserRoles(self, clientId: str, userId: str, roleIds: list):
        try:
            cn = self(UsersStore, self).begin()
            for roleId in roleIds:
                c = cn.cursor()
                c.callproc('iam.role_assign_user', [clientId, roleId, userId])
            super(UsersStore, self).commit(cn)
        except Exception as e:
            log.error(e)
            super(UsersStore, self).rollback(cn)
            raise Exception('Unable to assign roles to user')

    def removeClientUserRole(self, clientId: str, userId: str, roleId: str):
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
