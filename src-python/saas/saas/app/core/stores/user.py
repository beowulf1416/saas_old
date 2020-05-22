import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager


class UserStore(object):

    def __init__(self, manager: ConnectionManager, name: str):
        self._mgr = manager
        self._name = name

    def emailExists(self, email: str):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.callproc('iam.user_email_exists', [email, ])
            [(result, ), ] = c.fetchall()
            return result
        except Exception as e:
            log.error(e)
            raise Exception('An error occured while checking if email exists')
        finally:
            self._mgr.returnConnection(self._name, cn)

    def userAdd(self, email: str, name: str):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.callproc('iam.user_add', [email, name])
            cn.commit()
            [(user_id, )] = c.fetchall()
            return user_id
        except Exception as e:
            cn.rollback()
            log.error(e)
            raise Exception('An error occured while adding user')
        finally:
            self._mgr.returnConnection(self._name, cn)
        

    def userByEmail(self, email: str):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.callproc('iam.user_get_by_email', [email, ])
            [result, ] = c.fetchall()
            return result
        except ValueError as e:
            log.error(e)
            raise Exception("User with email '{0}' not found".format(email))
        except Exception as e:
            log.error(e)
            raise Exception('An error occured while retrieving user info')
        finally:
            self._mgr.returnConnection(self._name, cn)

    def userClients(self, user_id: str):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.callproc('iam.user_clients_all', [user_id, ])
            return c.fetchall()
        except Exception as e:
            log.error(e)
            raise Exception('An error occured while retrieving user clients')
        finally:
            self._mgr.returnConnection(self._name, cn)


    def userHasPermission(self, user_id: str, client_id: str, permission: str):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.callproc('iam.user_has_permission', [user_id, client_id, permission])
            [(result, )] = c.fetchall()
            return result
        except Exception as e:
            log.error(e)
            raise Exception('An error occured while checking if user has permission')
        finally:
            self._mgr.returnConnection(self._name, cn)