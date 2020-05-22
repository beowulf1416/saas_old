import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager


class RolesStore(object):

    def __init__(self, manager: ConnectionManager, name: str):
        self._mgr = manager
        self._name = name

    def getAll(self, clientId: str):
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


    def add(self, clientId: str, name: str):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            result = c.callproc('iam.role_add', [clientId, name])
            cn.commit()
            return result[0]
        except Exception as e:
            cn.rollback()
            log.error(e)
            raise Exception('An error occured while adding client role')
        finally:
            self._mgr.returnConnection(self._name, cn)

    def setActive(self, roleId: str, active: bool):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.callproc('iam.role_set_active', [roleId, active])
            cn.commit()
        except Exception as e:
            cn.rollback()
            log.error(e)
            raise Exception('An error occured while setting client role active status')
        finally:
            self._mgr.returnConnection(self._name, cn)

    def permissions(self, clientId: str, roleId: str):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.callproc('iam.permissions_role', [clientId, roleId])
            result = c.fetchall()
            return result
        except Exception as e:
            log.error(e)
            raise Exception('An error occured while retrieving client roles')
        finally:
            self._mgr.returnConnection(self._name, cn)


    def assignPermissions(self, clientId: str, roleId: str, permissionIds: list):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            for permissionId in permissionIds:
                c.callproc('iam.permissions_role_assign', [clientId, roleId, permissionId])
            cn.commit()
        except Exception as e:
            cn.rollback()
            log.error(e)
            raise Exception('An error occured while retrieving assigning permissions to client role')
        finally:
            self._mgr.returnConnection(self._name, cn)

    def removePermission(self, clientId: str, roleId: str, permissionId: str):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.callproc('iam.permissions_role_revoke', [clientId, roleId, permissionId])
            cn.commit()
        except Exception as e:
            cn.rollback()
            log.error(e)
            raise Exception('An error occured while retrieving removing permission from client role')
        finally:
            self._mgr.returnConnection(self._name, cn)