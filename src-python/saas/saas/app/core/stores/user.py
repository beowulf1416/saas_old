import logging
log = logging.getLogger(__name__)

class UserStore(object):

    def __init__(self, connection):
        self._connection = connection

    def emailExists(self, email: str):
        try:
            c = self._connection.cursor()
            c.callproc('iam.user_email_exists', [email, ])
            [(result, ), ] = c.fetchall()
            return result
        except Exception as e:
            log.error(e)
            raise Exception('An error occured while checking if email exists')

    def userAdd(self, email: str, name: str):
        try:
            c = self._connection.cursor()
            c.callproc('iam.user_add', [email, name])
            self._connection.commit()
            return c.fetchall()
        except Exception as e:
            self._connection.rollback()
            log.error(e)
            raise Exception('An error occured while adding user')
        

    def userByEmail(self, email: str):
        try:
            c = self._connection.cursor()
            c.callproc('iam.user_get_by_email', [email, ])
            [result, ] = c.fetchall()
            return result
        except Exception as e:
            log.error(e)
            raise Exception('An error occured while retrieving user info')

    def userClients(self, user_id: str):
        try:
            c = self._connection.cursor()
            c.callproc('iam.user_clients_all', [user_id, ])
            return c.fetchall()
        except Exception as e:
            log.error(e)
            raise Exception('An error occured while retrieving user clients')
