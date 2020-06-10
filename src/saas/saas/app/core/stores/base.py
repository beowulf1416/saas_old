import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager


class BaseStore(object):

    def __init__(self, manager: ConnectionManager, name: str):
        self._mgr = manager
        self._name = name

    def runProc(self, procedure: str, params: list):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.callproc(procedure, params)
            return c.fetchall()
        except Exception as e:
            log.error(e)
            raise e
        finally:
            self._mgr.returnConnection(self._name, cn)

    def runProcTransactional(self, procedure: str, params: list):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.callproc(procedure, params)
            cn.commit()
            return c.fetchall()
        except Exception as e:
            cn.rollback()
            log.error(e)
            raise e
        finally:
            self._mgr.returnConnection(self._name, cn)

    def execute(self, query: str):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.execute(query)
            return c.fetchall()
        except Exception as e:
            log.error(e)
            raise e
        finally:
            self._mgr.returnConnection(self._name, cn)

    def executeTransactional(self, query: str):
        cn = self._mgr.getConnection(self._name)
        try:
            c = cn.cursor()
            c.execute(query)
            cn.commit()
            return c.fetchall()
        except Exception as e:
            cn.rollback()
            log.error(e)
            raise e
        finally:
            self._mgr.returnConnection(self._name, cn)

    def begin(self):
        cn = self._mgr.getConnection(self._name)
        return cn

    def commit(self, cn):
        cn.commit()
        self._mgr.returnConnection(self._name, cn)

    def rollback(self, cn):
        cn.rollback()
        self._mgr.returnConnection(self._name, cn)