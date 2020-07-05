import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service

from saas.app.modules.crm.stores.organizations import OrganizationStore

def includeme(config):
    log.info('including: saas.app.modules.crm.stores')

    services = get_service(None)
    mgr = services['connection.manager']

    services['store.crm.organizations'] = OrganizationStore(mgr, 'default')