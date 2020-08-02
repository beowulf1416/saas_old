import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service

from saas.app.modules.common.stores.countries import CountryStore
from saas.app.modules.common.stores.currencies import CurrencyStore
from saas.app.modules.common.stores.uom import UOMStore


def includeme(config):
    log.info('including: saas.app.modules.common.stores')

    services = get_service(None)
    mgr = services['connection.manager']

    services['stores.common.countries'] = CountryStore(mgr, 'default')
    services['stores.common.currencies'] = CurrencyStore(mgr, 'default')
    services['stores.common.uoms'] = UOMStore(mgr, 'default')