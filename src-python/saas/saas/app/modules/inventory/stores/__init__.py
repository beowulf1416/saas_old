import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service

from saas.app.modules.inventory.stores.items import ItemsStore
from saas.app.modules.inventory.stores.warehouses import WarehouseStore


def includeme(config):
    log.info('including: saas.app.modules.inventory.stores')

    services = get_service(None)
    mgr = services['connection.manager']

    itemsStore = ItemsStore(mgr, 'default')
    services['store.inventory.items'] = itemsStore

    warehouseStore = WarehouseStore(mgr, 'default')
    services['store.inventory.warehouses'] = warehouseStore