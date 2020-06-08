import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore


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

    def getClient(self, client_id: str):
        '''returns the specified client
            return value is a tuple containing (client_id, active, name, address)
        '''
        try:
            [client, ] = super(ClientStore, self).runProc('clients.clients_get', [client_id, ])
            return client
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve client')