import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service

from saas.app.modules.inventory.stores.items import ItemsStore


def includeme(config):
    log.info('including: saas.app.modules.inventory.stores')

    services = get_service(None)
    mgr = services['connection.manager']

    itemsStore = ItemsStore(mgr, 'default')
    services['store.inventory.items'] = itemsStore