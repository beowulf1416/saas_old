import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service
from saas.app.core.stores.user import UserStore
from saas.app.core.stores.client import ClientStore


def includeme(config):
    log.info('including: saas.app.core.stores')

    services = get_service(None)
    mgr = services['connection.manager']
    # connection = mgr['default']

    userStore = UserStore(mgr, 'default')
    services['store.user'] = userStore

    clientStore = ClientStore(mgr, 'default')
    services['store.client'] = clientStore