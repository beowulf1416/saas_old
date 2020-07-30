import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service

def includeme(config):
    log.info('including: saas.app.modules.kiosk')

    config.include('saas.app.modules.kiosk.stores')
    config.include('saas.app.modules.kiosk.api')

    services = get_service(None)

    modules = services['modules']
    modules['kiosk'] = {
        'navigators': [
            {
                'id': 'kiosk',
                'title': 'Self-Service',
                'help': 'Self-Service',
                'icon': '<span class="material-icons">self_improvement</span>',
                'template': 'saas.app.modules.kiosk:templates/module.html'                
            }
        ],
        'js': [
            {
                'type': 'module',
                'script': '/static/js/modules/kiosk/actions.js',
                'async': True
            }
        ]
    }