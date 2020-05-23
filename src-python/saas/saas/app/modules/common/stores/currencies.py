import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager


class CurrencyStore(object):

    def __init__(self, manager: ConnectionManager, name: str):
        self._mgr = manager
        self._name = name

    def all(self):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.callproc('common.currencies_all')
            result = c.fetchall()
            return result
        except Exception as e:
            log.error(e)
            raise Exception('An error occured while retrieving all currencies')
        finally:
            self._mgr.returnConnection(self._name, cn)