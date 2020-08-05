import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service

from saas.app.modules.inventory.stores.items import ItemsStore
from saas.app.modules.inventory.stores.facility import FacilityStore
from saas.app.modules.inventory.stores.locations import LocationStore


def includeme(config):
    log.info('including: saas.app.modules.inventory.stores')

    services = get_service(None)
    mgr = services['connection.manager']

    services['store.inventory.items'] = ItemsStore(mgr, 'default')
    services['store.inventory.facilities'] = FacilityStore(mgr, 'default')
    services['store.inventory.locations'] = LocationStore(mgr, 'default')