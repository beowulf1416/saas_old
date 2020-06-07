import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service


def includeme(config):
    log.info('including: saas.app.modules.clients')

    config.include('saas.app.modules.clients.stores')
    config.include('saas.app.modules.clients.views')
    config.include('saas.app.modules.clients.views.api')

    services = get_service(None)
    
    modules = services['modules']
    modules['client'] = {
        'navigators': [
            {
                'id': 'client',
                'title': 'Client Management',
                'help': 'Client management',
                'icon': '<span class="material-icons">business</span>',
                'template': 'saas.app.modules.clients:templates/module.html'
            }
        ]
    }