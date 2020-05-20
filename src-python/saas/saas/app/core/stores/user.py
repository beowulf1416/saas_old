import logging
log = logging.getLogger(__name__)

class UserStore(object):

    def __init__(self, manager):
        self._mgr = manager

    def emailExists(self, email: str):
        cn = self._mgr.getConnection('default')
        try:
            c = cn.cursor()
            c.callproc('iam.user_email_exists', [email, ])
            [(result, ), ] = c.fetchall()
            return result
        except Exception as e:
            log.error(e)
            raise Exception('An error occured while checking if email exists')
        finally:
            self._mgr.returnConnection('default', cn)

    def userAdd(self, email: str, name: str):
        cn = self._mgr.getConnection('default')
        try:
            c = cn.cursor()
            c.callproc('iam.user_add', [email, name])
            self._connection.commit()
            return c.fetchall()
        except Exception as e:
            self._connection.rollback()
            log.error(e)
            raise Exception('An error occured while adding user')
        finally:
            self._mgr.returnConnection('default', cn)
        

    def userByEmail(self, email: str):
        cn = self._mgr.getConnection('default')
        try:
            c = cn.cursor()
            c.callproc('iam.user_get_by_email', [email, ])
            [result, ] = c.fetchall()
            return result
        except Exception as e:
            log.error(e)
            raise Exception('An error occured while retrieving user info')
        finally:
            self._mgr.returnConnection('default', cn)

    def userClients(self, user_id: str):
        cn = self._mgr.getConnection('default')
        try:
            c = cn.cursor()
            c.callproc('iam.user_clients_all', [user_id, ])
            return c.fetchall()
        except Exception as e:
            log.error(e)
            raise Exception('An error occured while retrieving user clients')
        finally:
            self._mgr.returnConnection('default', cn)


    def userHasPermission(self, user_id: str, client_id: str, permission: str):
        cn = self._mgr.getConnection('default')
        try:
            c = cn.cursor()
            c.callproc('iam.user_has_permission', [user_id, client_id, permission])
            [(result, )] = c.fetchall()
            return result
        except Exception as e:
            log.error(e)
            raise Exception('An error occured while checking if user has permission')
        finally:
            self._mgr.returnConnection('default', cn)