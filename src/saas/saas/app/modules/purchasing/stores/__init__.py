import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service

from saas.app.modules.purchasing.stores.purchase_order import PurchaseOrderStore
from saas.app.modules.purchasing.stores.vendors import VendorStore


def includeme(config):
    log.info('including: saas.app.modules.purchasing.stores')

    services = get_service(None)
    mgr = services['connection.manager']

    services['store.purchasing.po'] = PurchaseOrderStore(mgr, 'default')
    services['store.purchasing.vendors'] = VendorStore(mgr, 'default')