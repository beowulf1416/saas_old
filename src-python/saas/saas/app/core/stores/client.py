import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager


class ClientStore(object):

    def __init__(self, manager: ConnectionManager, name: str):
        self._mgr = manager
        self._name = name

    def getDefaultClient(self):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.callproc('clients.client_default')
            [client, ] = c.fetchall()
            return client
        except Exception as e:
            log.error(e)
            raise e
        finally:
            self._mgr.returnConnection(self._name, cn)

    def getClient(self, client_id: str):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.callproc('clients.clients_get', [client_id, ])
            [client, ] = c.fetchall()
            return client
        except Exception as e:
            log.error(e)
            raise e
        finally:
            self._mgr.returnConnection(self._name, cn)