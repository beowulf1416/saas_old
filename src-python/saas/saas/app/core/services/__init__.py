import logging
log = logging.getLogger(__name__)

from saas.app.core.services.services import Services
from saas.app.core.services.connection import ConnectionManager
from saas.app.core.services.validator import SchemaValidator

__services = Services()

def includeme(config):
    log.debug('including: saas.app.core.services')
    settings = config.get_settings()

    connections = ConnectionManager(settings)
    __services['connection.manager'] = connections

    schema_path = settings['schema.path']
    validator = SchemaValidator(schema_path)
    __services['validator.json'] = validator

    __services['modules'] = {}
    
    __services['page.styles'] = {}
    __services['page.scripts'] = {}
    __services['page.actions'] = {}

    config.add_request_method(
        get_service,
        name = 'services'
    )

def get_service(request):
    return __services