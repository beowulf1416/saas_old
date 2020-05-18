import logging
log = logging.getLogger(__name__)

class ClientStore(object):

    def __init__(self, connection):
        self._connection = connection

    def getDefaultClient(self):
        try:
            c = self._connection.cursor()
            c.callproc('clients.client_default')
            [client, ] = c.fetchall()
            return client
        except Exception as e:
            log.error(e)
            raise e

    def getClient(self, client_id: str):
        try:
            c = self._connection.cursor()
            c.callproc('clients.clients_get', [client_id, ])
            [client, ] = c.fetchall()
            return client
        except Exception as e:
            log.error(e)
            raise e