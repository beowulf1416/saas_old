import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore, StoreException

from uuid import UUID


class CountryStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(CountryStore, self).__init__(manager, name)

    def all(self):
        try:
            return super(CountryStore, self).runProc('common.countries_all', [])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve all countries')

    def filter(self, filter: str) -> []:
        try:
            return super(CountryStore, self).runProc('common.countries_filter', [
                f'%{filter}%'
            ])
        except Exception as e:
            log.error(e)
            raise StoreException('Unable to retrieve a filtered list of countries')

    def get(self, country_id: UUID):
        try:
            result = super(CountryStore, self).runProc('common.countries_get', [
                country_id
            ])
            if len(result) > 0:
                return result[0]
            else:
                raise StoreException('No country found with specified Id')
        except Exception as e:
            log.error(e)
            raise StoreException('Unable to retrieve country')