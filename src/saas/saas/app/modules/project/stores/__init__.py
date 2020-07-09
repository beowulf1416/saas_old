import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service

from saas.app.modules.project.stores.projects import ProjectStore


def includeme(config):
    log.info('including: saas.app.modules.project.stores')

    services = get_service(None)
    mgr = services['connection.manager']

    services['store.project.project'] = ProjectStore(mgr, 'default')