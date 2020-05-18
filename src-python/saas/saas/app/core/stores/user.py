import logging
log = logging.getLogger(__name__)

class UserStore(object):

    def __init__(self, connection):
        self._connection = connection

    def emailExists(self, email: str):
        try:
            c = self._connection.cursor()
            c.callproc('iam.user_email_exists', [email, ])
            # c.execute()
            return c.fetchall()
        except Exception as e:
            log.error(e)
            raise Exception('An error occured while checking if email exists')