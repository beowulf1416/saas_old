import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service
from saas.app.modules.clients.stores.organizations import OrganizationsStore

def includeme(config):
    log.info('including: saas.app.modules.clients.stores')

    services = get_service(None)
    mgr = services['connection.manager']

    orgsStore = OrganizationsStore(mgr, 'default')
    services['store.clients.organizations']
