import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service

from saas.app.modules.project.stores.projects import ProjectStore
from saas.app.modules.project.stores.tasks import TaskStore


def includeme(config):
    log.info('including: saas.app.modules.project.stores')

    services = get_service(None)
    mgr = services['connection.manager']

    services['store.project.projects'] = ProjectStore(mgr, 'default')
    services['store.project.tasks'] = TaskStore(mgr, 'TaskStore')