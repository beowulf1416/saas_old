import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service


def includeme(config):
    log.info('including: saas.app.modules.clients')

    config.include('saas.app.modules.clients.stores')
    config.include('saas.app.modules.clients.api')

    services = get_service(None)
    
    modules = services['modules']
    modules['client'] = {
        'navigators': [
            {
                'id': 'client',
                'title': 'Client Management',
                'help': 'Client management',
                'icon': '<span class="material-icons">business</span>',
                'template': 'saas.app.modules.clients:templates/navigator.html',
                'permission': 'clients.admin'
            }
        ],
        'js': [
            {
                'type': 'module',
                'script': '/static/js/modules/clients/actions.js'
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/clients/organization-tree/organization-tree.js',
                'async': True
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/clients/organization-editor/organization-editor.js',
                'async': True
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/clients/client-users/client-users.js',
                'async': True
            }
        ]
    }