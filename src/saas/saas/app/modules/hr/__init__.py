import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service


def includeme(config):
    log.info('including: saas.app.modules.hr')

    config.include('saas.app.modules.hr.stores')
    config.include('saas.app.modules.hr.api')

    services = get_service(None)
    modules = services['modules']
    modules['hr'] = {
        'navigators': [
            {
                'id': 'hr',
                'title': 'Human Resources',
                'help': 'Manage Human Resources',
                'icon': '<span class="material-icons">group</span>',
                'template': 'saas.app.modules.hr:templates/module.html'
            }
        ],
        'views': [],
        'css': [],
        'js': [
            {
                'type': 'module',
                'script': '/static/js/modules/hr/actions.js'
            },
            {
                'type': 'module',
                'script': '/static/custom.elements/hr/team.explorer/team.explorer.js'
            },
            {
                'type': 'module',
                'script': '/static/custom.elements/hr/member.editor/member.editor.js'
            },
            {
                'type': 'module',
                'script': '/static/custom.elements/hr/member-selector/member-selector.js'
            },
            {
                'type': 'module',
                'script': '/static/custom.elements/hr/member-selector/member-selector-view.js'
            },
            {
                'type': 'module',
                'script': '/static/custom.elements/hr/time-entries/time-entries.js'
            },
            {
                'script': 'https://cdnjs.cloudflare.com/ajax/libs/uuid/8.1.0/uuidv4.min.js',
                'external': 'true'
            }
        ]
    }
