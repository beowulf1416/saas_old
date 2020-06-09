import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: saas.app.modules.admin.views.api')

    config.add_route(
        'api.clients.all',
        '/api/clients/all'
    )

    config.add_route(
        'api.clients.add',
        '/api/clients/add'
    )

    config.add_route(
        'api.clients.update',
        '/api/clients/update'
    )

    config.add_route(
        'api.clients.get',
        '/api/clients/get'
    )

    config.add_route(
        'api.clients.setactive',
        '/api/clients/active'
    )

    config.add_route(
        'api.clients.filter',
        '/api/clients/filter'
    )

    config.add_route(
        'api.clients.roles.all',
        '/api/clients/roles/all'
    )

    config.add_route(
        'api.clients.roles.add',
        '/api/clients/roles/add'
    )

    config.add_route(
        'api.clients.roles.active',
        '/api/clients/roles/active'
    )

    config.add_route(
        'api.clients.roles.permissions.all',
        '/api/clients/roles/permissions/all'
    )

    config.add_route(
        'api.clients.roles.permissions.add',
        '/api/clients/roles/permissions/add'
    )

    config.add_route(
        'api.clients.roles.permissions.remove',
        '/api/clients/roles/permissions/remove'
    )

    config.add_route(
        'api.clients.users.all',
        '/api/clients/users/all'
    )

    config.add_route(
        'api.clients.users.add',
        '/api/clients/users/add'
    )

    config.add_route(
        'api.clients.users.remove',
        '/api/clients/users/remove'
    )

    config.add_route(
        'api.clients.users.roles.all',
        '/api/clients/users/roles/all'
    )

    config.add_route(
        'api.clients.users.roles.add',
        '/api/clients/users/roles/add'
    )

    config.add_route(
        'api.clients.users.roles.remove',
        '/api/clients/users/roles/remove'
    )

    config.add_route(
        'api.clients.permissions.all',
        '/api/clients/permissions/all'
    )

    config.add_route(
        'api.clients.permissions.filter',
        '/api/clients/permissions/filter'
    )