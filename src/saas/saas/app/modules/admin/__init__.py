import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service


def includeme(config):
    log.info('including: saas.app.modules.admin')

    config.include('saas.app.modules.admin.stores')
    config.include('saas.app.modules.admin.views')
    config.include('saas.app.modules.admin.views.api')

    services = get_service(None)

    modules = services['modules']
    modules['admin'] = {
        'navigators': [
            {
                'id': 'admin',
                'title': 'System Administration',
                'help': 'Manage clients, users and roles',
                'icon': '<span class="material-icons">admin_panel_settings</span>',
                'template': 'saas.app.modules.admin:templates/navigator.html'
            }
        ],
        'views': [
            {
                'name': 'user selector',
                'id': 'admin-user-selector',
                'help': 'User Selector',
                'icon': '<span class="material-icons">admin_panel_settings</span>',
                'template': 'saas.app.modules.admin:templates/user-selector.html'
            },
            {
                'name': 'client selector',
                'id': 'client-selector',
                'help': 'Select Client',
                'icon': '<span class="material-icons">search</span>'
            }
        ],
        'css': [],
        'js': [
            {
                'type': 'module',
                'script': '/static/js/modules/admin.js'
            },
            {
                'type': 'module',
                'script': '/static/custom.elements/client.editor/client.editor.js'
            },
            {
                'type': 'module',
                'script': '/static/custom.elements/clients.table/clients.table.js'
            },
            {
                'type': 'module',
                'script': '/static/custom.elements/client.roles/client.roles.js'
            },
            {
                'type': 'module',
                'script': '/static/custom.elements/client.selector/client.selector.js'
            },
            {
                'type': 'module',
                'script': '/static/custom.elements/role.editor/role.editor.js'
            },
            {
                'type': 'module',
                'script': '/static/custom.elements/role.selector/role.selector.js'
            },
            {
                'type': 'module',
                'script': '/static/custom.elements/permission.selector/permission.selector.js'
            }
        ]
    }