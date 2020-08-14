import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service

def includeme(config):
    log.info('including: saas.app.core.modules.user')

    services = get_service(None)

    modules = services['modules']
    modules['user'] = {
        'navigators': [
            {
                'id': 'user',
                'title': 'User',
                'help': 'User Dashboard',
                'icon': '<span class="material-icons">person</span>',
                'template': 'saas.app.core.modules.user:templates/navigator.html'
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