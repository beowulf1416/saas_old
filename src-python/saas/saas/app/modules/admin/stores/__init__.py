import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service
from saas.app.modules.admin.stores.clients import ClientsStore


def includeme(config):
    log.info('including: saas.app.modules.admin.stores')

    services = get_service(None)
    mgr = services['connection.manager']

    clientsStore = ClientsStore(mgr, 'default')
    services['store.admin.clients'] = clientsStore