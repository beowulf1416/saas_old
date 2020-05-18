import logging
log = logging.getLogger(__name__)

from saas.app.core.services.manager import ServiceManager
from saas.app.core.services.connection import ConnectionManager

__services = ServiceManager()

def includeme(config):
    log.debug('including: saas.app.core.services')
    settings = config.get_settings()
    connections = ConnectionManager(settings)
    __services['connection.manager'] = connections

    config.add_request_method(
        get_service,
        name = 'services'
    )

def get_service(request):
    return __services