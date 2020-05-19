import logging
log = logging.getLogger(__name__)

class ClientsStore(object):

    def __init__(self, connection):
        self._connection = connection

    def getAll(self):
        try:
            c = self._connection.cursor()
            c.callproc('clients.clients_all')
            result = c.fetchall()
            return result
        except Exception as e:
            log.error(e)
            raise e

    def add(self, name: str, address: str):
        try:
            c = self._connection.cursor()
            c.callproc('clients.client_add', [name, address])
            result = c.fetchall()
            return result
        except Exception as e:
            log.error(e)
            raise e