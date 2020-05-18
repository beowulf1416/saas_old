import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service
from saas.app.core.stores.user import UserStore


def includeme(config):
    log.info('including: saas.app.core.stores')

    mgr = get_service(None, 'connection.manager')
    connection = mgr['default']

    log.debug(connection)

    userStore = UserStore(connection)
    mgr['store.user'] = userStore