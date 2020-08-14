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

    # default modules
    __services['modules'] = {
        'global': {
            'js': [
                {
                    'script': 'https://cdnjs.cloudflare.com/ajax/libs/uuid/8.1.0/uuidv4.min.js',
                    'async': True,
                    'external': True
                }
            ]
        },
        'user': {
            'navigators': [
                {
                    'id': 'user',
                    'title': 'User',
                    'help': 'User Dashboard',
                    'icon': '<span class="material-icons">person</span>',
                    'template': 'saas.app.core:templates/user/module.html'
                }
            ],
            'js': [
                {
                    'type': 'module',
                    'script': '/static/custom-elements/user/profile-editor.js',
                    'async': True
                }
            ]
        }
    }


    config.add_request_method(
        get_service,
        name = 'services'
    )

def get_service(request):
    return __services