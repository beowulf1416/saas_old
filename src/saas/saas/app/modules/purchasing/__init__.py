import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service


def includeme(config):
    log.info('including: saas.app.modules.purchasing')

    services = get_service(None)
    modules = services['modules']
    modules['purchasing'] = {
        'navigators': [
            {
                'id': 'Purchasing',
                'title': 'Purchasing',
                'help': 'Manage Purchasing',
                'icon': '<span class="material-icons">view_quilt</span>',
                'template': 'saas.app.modules.purchasing:templates/module.html'
            }
        ],
        'views': [],
        'css': [],
        'js': [
            {
                'type': 'module',
                'script': '/static/js/modules/purchasing/actions.js'
            }
        ]
    }
