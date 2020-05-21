import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager


class ClientsStore(object):

    def __init__(self, manager: ConnectionManager, name: str):
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


    def allRoles(self, clientId: str):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.callproc('iam.client_roles_all', [clientId, ])
            result = c.fetchall()
            return result
        except Exception as e:
            log.error(e)
            raise Exception('An error occured while retrieving client roles')
        finally:
            self._mgr.returnConnection(self._name, cn)


    def addRole(self, clientId: str, name: str):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.callproc('iam.role_add', [clientId, name])
            cn.commit()
        except Exception as e:
            cn.rollback()
            log.error(e)
            raise Exception('An error occured while adding client role')
        finally:
            self._mgr.returnConnection(self._name, cn)

    def allUsers(self, clientId: str):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            result = c.callproc('iam.client_users_all', [clientId, ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('An error occured while retrieving client users')
        finally:
            self._mgr.returnConnection(self._name, cn)

    def addUser(self, clientId: str, userId: str):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.callproc('iam.client_user_add', [clientId, userId])
            cn.commit()
        except Exception as e:
            cn.rollback()
            log.error(e)
            raise Exception('An error occured while adding client user')
        finally:
            self._mgr.returnConnection(self._name, cn)
        