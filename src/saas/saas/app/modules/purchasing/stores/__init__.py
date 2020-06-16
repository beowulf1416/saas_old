import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service

from saas.app.modules.purchasing.stores.purchase_order import PurchaseOrderStore


def includeme(config):
    log.info('including: saas.app.modules.purchasing.stores')

    services = get_service(None)
    mgr = services['connection.manager']

    poStore = PurchaseOrderStore(mgr, 'default')
    services['store.purchasing.po'] = poStore