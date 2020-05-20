import logging
log = logging.getLogger(__name__)

class ClientsStore(object):

    def __init__(self, manager, name):
        self._mgr = manager
        self._name = name

    def getAll(self):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.callproc('clients.clients_all')
            result = c.fetchall()
            return result
        except Exception as e:
            log.error(e)
            raise Exception('An error occured while retrieving all clients')
        finally:
            self._mgr.returnConnection(self._name, cn)

    def add(self, name: str, address: str, url: str):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.callproc('clients.client_add', [name, address, url])
            cn.commit()
            [(client_id, )] = c.fetchall()
            return client_id
        except Exception as e:
            cn.rollback()
            log.error(e)
            raise Exception('An error occured while adding a client')
        finally:
            self._mgr.returnConnection(self._name, cn)

    def get(self, client_id: str):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.callproc('clients.clients_get', [client_id, ])
            (client, ) = c.fetchall()
            return client
        except Exception as e:
            log.error(e)
            raise Exception('An error occured while retrieving client')
        finally:
            self._mgr.returnConnection(self._name, cn)

    def getByUrlName(self, url_name: str):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.callproc('clients.client_by_url_name', [url_name, ])
            [client, ] = c.fetchall()
            return client
        except Exception as e:
            log.error(e)
            raise Exception('An error occured while retrieving client by url name')
        finally:
            self._mgr.returnConnection(self._name, cn)

    def setActive(self, clientId: str, active: bool):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.callproc('clients.client_set_active', [clientId, active])
            cn.commit()
        except Exception as e:
            cn.rollback()
            log.error(e)
            raise Exception('An error occured while setting client active status')
        finally:
            self._mgr.returnConnection(self._name, cn)