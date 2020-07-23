import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service

from saas.app.modules.documents.stores.documents import DocumentStore

def includeme(config):
    log.info('including: saas.app.modules.documents.stores')

    services = get_service(None)
    mgr = services['connection.manager']

    services['store.documents.documents'] = DocumentStore(mgr, 'default')