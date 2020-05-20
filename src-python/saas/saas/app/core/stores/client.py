import logging
log = logging.getLogger(__name__)

class ClientStore(object):

    def __init__(self, manager):
        self._mgr = manager

    def getDefaultClient(self):
        cn = self._mgr.getConnection('default')
        try:
            c = cn.cursor()
            c.callproc('clients.client_default')
            [client, ] = c.fetchall()
            return client
        except Exception as e:
            log.error(e)
            raise e
        finally:
            self._mgr.returnConnection('default', cn)

    def getClient(self, client_id: str):
        cn = self._mgr.getConnection('default')
        try:
            c = cn.cursor()
            c.callproc('clients.clients_get', [client_id, ])
            [client, ] = c.fetchall()
            return client
        except Exception as e:
            log.error(e)
            raise e
        finally:
            self._mgr.returnConnection('default', cn)