import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore, StoreException


class CurrencyStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(CurrencyStore, self).__init__(manager, name)

    def all(self):
        try:
            return super(CurrencyStore, self).runProc('common.currencies_all', [])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve all currencies')

    def filter(self, filter: str):
        try:
            return super(CurrencyStore, self).runProc('common.currencies_filter', [
                f'%{filter}%',
            ])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve currencies')

    def get(self, currency_id: int):
        try:
            return super(CurrencyStore, self).runProc('common.currency_get', [
                currency_id,
            ])
        except StoreException as e:
            log.error(e)
            raise StoreException('Unable to retrieve currency')