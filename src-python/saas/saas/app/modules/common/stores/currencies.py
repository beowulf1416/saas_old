import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore


class CurrencyStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(CurrencyStore, self).__init__(manager, name)

    def all(self):
        try:
            return super(CurrencyStore, self).runProc('common.currencies_all', [])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve all currencies')