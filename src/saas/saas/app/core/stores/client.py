import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore, StoreException

from uuid import UUID

class ClientStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(ClientStore, self).__init__(manager, name)

    def getDefaultClient(self):
        '''returns the default client
            return value is a tuple containing (client_id, active, name, address, url_name)
        '''
        try:
            [client, ] = super(ClientStore, self).runProc('clients.client_default', [])
            return client
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve default client')

    def getClient(self, client_id: UUID):
        '''returns the specified client
            return value is a tuple containing (client_id, active, name, address)
        '''
        try:
            [client, ] = super(ClientStore, self).runProc('clients.clients_get', [client_id, ])
            return client
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve client')

    def by_name(self, name: str) -> UUID:
        try:
            result = super(ClientStore, self).runProc('clients.client_by_email', [
                super(ClientStore, self).remove_wildcards(name)
            ])
            if (len(result) > 0):
                return result[0]
            else:
                return None
        except Exception as e:
            log.error(e)
            raise StoreException('Unable to find client using name')

    def join(self, client_id: UUID, user_id: UUID) -> None:
        try:
            super(ClientStore, self).runProcTransactional('iam.client_user_add', [
                str(client_id),
                str(user_id)
            ])
        except Exception as e:
            log.error(e)
            raise StoreException('Unable to join client')