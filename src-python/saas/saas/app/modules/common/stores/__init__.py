import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service

from saas.app.modules.common.stores.countries import CountryStore
from saas.app.modules.common.stores.currencies import CurrencyStore


def includeme(config):
    log.info('including: saas.app.modules.common.stores')

    services = get_service(None)
    mgr = services['connection.manager']

    countryStore = CountryStore(mgr)
    services['stores.common.countries'] = countryStore

    currencyStore = CurrencyStore(mgr)
    services['stores.common.currencies'] = currencyStore