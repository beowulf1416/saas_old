import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager


class UsersStore(object):

    def __init__(self, manager: ConnectionManager, name: str):
        self._mgr = manager
        self._name = name

    def getAllClientUsers(self, clientId: str):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.callproc('iam.client_users_all', [clientId, ])
            result = c.fetchall()
            return result
        except Exception as e:
            log.error(e)
            raise Exception('An error occured while retrieving client users')
        finally:
            self._mgr.returnConnection(self._name, cn)

    def addClientUser(self, clientId: str, userId: str):
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

    def removeClientUser(self, clientId: str, userId: str):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.callproc('iam.client_user_remove', [clientId, userId])
            cn.commit()
        except Exception as e:
            cn.rollback()
            log.error(e)
            raise Exception('An error occured while removing client user')
        finally:
            self._mgr.returnConnection(self._name, cn)

    def clientRoles(self, clientId: str, userId: str):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.callproc('iam.client_user_roles', [clientId, userId])
            result = c.fetchall()
            return result
        except Exception as e:
            log.error(e)
            raise Exception('An error occured while retrieving client user roles')
        finally:
            self._mgr.returnConnection(self._name, cn)

