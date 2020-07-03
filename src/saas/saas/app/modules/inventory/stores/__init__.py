import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service

from saas.app.modules.inventory.stores.items import ItemsStore
from saas.app.modules.inventory.stores.warehouses import WarehouseStore
from saas.app.modules.inventory.stores.locations import LocationStore
from saas.app.modules.inventory.stores.vendors import VendorStore


def includeme(config):
    log.info('including: saas.app.modules.inventory.stores')

    services = get_service(None)
    mgr = services['connection.manager']

    itemsStore = ItemsStore(mgr, 'default')
    services['store.inventory.items'] = itemsStore

    warehouseStore = WarehouseStore(mgr, 'default')
    services['store.inventory.warehouses'] = warehouseStore

    locationStore = LocationStore(mgr, 'default')
    services['store.inventory.locations'] = locationStore

    vendorStore = VendorStore(mgr, 'default')
    services['store.inventory.vendors'] = vendorStore