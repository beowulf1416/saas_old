import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore


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

    def userAdd(self, email: str, name: str):
        ''' add user
        '''
        try:
            [(user_id, )] = super(UserStore, self).runProcTransactional('iam.user_add', [email, name])
            return user_id
        except Exception as e:
            log.error(e)
            raise Exception('Unable to add user')
        

    def userByEmail(self, email: str):
        '''find user account by email address
        '''
        try:
            [result, ] = super(UserStore, self).runProcTransactional('iam.user_get_by_email', [email, ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception("Unable to find user account by email address")

    def userClients(self, user_id: str):
        '''retrieve clients allowed/available to user
        '''
        try:
            result = super(UserStore, self).runProc('iam.user_clients_all', [user_id, ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception("Unable to retrieve user clients")

    def userHasPermission(self, user_id: str, client_id: str, permission: str):
        '''check if user has permission on client
        '''
        try:
            [(result, )] = super(UserStore, self).runProc('iam.user_has_permission', [user_id, client_id, permission])
            return result
        except Exception as e:
            log.error(e)
            raise Exception("Unable to check if user has permission on client")