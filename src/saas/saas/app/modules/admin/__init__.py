import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service


def includeme(config):
    log.info('including: saas.app.modules.admin')

    config.include('saas.app.modules.admin.stores')
    config.include('saas.app.modules.admin.api')

    services = get_service(None)

    modules = services['modules']
    modules['admin'] = {
        'navigators': [
            {
                'id': 'admin',
                'title': 'System Administration',
                'help': 'Manage clients, users and roles',
                'icon': '<span class="material-icons">admin_panel_settings</span>',
                'template': 'saas.app.modules.admin:templates/navigator.html',
                'permission': 'admin.dashboard'
            }
        ],
        'js': [
            {
                'type': 'module',
                'script': '/static/js/modules/admin/actions.js'
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/admin/client-editor/client-editor.js'
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/admin/clients-table/clients-table.js'
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/admin/client-roles/client-roles.js'
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/clients/client-selector/client-selector.js',
                'async': True
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/clients/client-selector/client-selector-view.js',
                'async': True
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/admin/role-editor/role-editor.js'
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/admin/role-selector/role-selector.js'
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/admin/permission-selector/permission-selector.js'
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/admin/client-users/client-users.js'
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/admin/user-selector/user-selector.js'
            }
        ]
    }