import logging
log = logging.getLogger(__name__)

from uuid import UUID

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore, StoreException

from typing import List


class UserStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(UserStore, self).__init__(manager, name)

    def emailExists(self, email: str):
        '''check if email is already registered
        '''
        try:
            [(result, )] = super(UserStore, self).runProc('iam.user_email_exists', [email, ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to check if email exists')

    def userAdd(self, user_id: UUID, email: str, name: str) -> None:
        ''' add user
        '''
        try:
            super(UserStore, self).runProcTransactional('iam.user_add', [
                str(user_id),
                email,
                name
            ])
        except Exception as e:
            log.error(e)
            raise StoreException('Unable to add user')
        

    def userByEmail(self, email: str):
        '''find user account by email address
        '''
        try:
            [result, ] = super(UserStore, self).runProcTransactional('iam.user_get_by_email', [email, ])
            return result
        except Exception as e:
            log.error(e)
            raise StoreException("Unable to find user account by email address")

    def userClients(self, user_id: UUID):
        '''retrieve clients allowed/available to user
        '''
        try:
            result = super(UserStore, self).runProc('iam.user_clients_all', [
                str(user_id), 
            ])
            return result
        except Exception as e:
            log.error(e)
            raise StoreException("Unable to retrieve user clients")

    def userHasPermission(self, user_id: UUID, client_id: UUID, permission: str) -> bool:
        '''check if user has permission on client
        '''
        try:
            [(result, )] = super(UserStore, self).runProc('iam.user_has_permission', [
                str(user_id), 
                str(client_id), 
                permission
            ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception("Unable to check if user has permission on client")

    def permissions(self, client_id: UUID, user_id: UUID) -> List[str]:
        try:
            result = super(UserStore, self).runProc('iam.client_user_permissions', [
                str(client_id),
                str(user_id)
            ])
            return result
        except Exception as e:
            log.error(e)
            raise StoreException('Unable to retrieve user permissions')