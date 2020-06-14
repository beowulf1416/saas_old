import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service


def includeme(config):
    log.info('including: saas.app.modules.hr')

    services = get_service(None)
    modules = services['modules']
    modules['hr'] = {
        'navigators': [
            {
                'id': 'Human Resources',
                'title': 'Human Resources',
                'help': 'Manage Human Resources',
                'icon': '<span class="material-icons">view_quilt</span>',
                'template': 'saas.app.modules.hr:templates/module.html'
            }
        ],
        'views': [],
        'css': [],
        'js': [
            {
                'type': 'module',
                'script': '/static/js/modules/hr/actions.js'
            }
        ]
    }
