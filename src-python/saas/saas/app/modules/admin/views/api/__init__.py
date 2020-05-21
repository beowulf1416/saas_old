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
        'api.clients.get',
        '/api/clients/get'
    )

    config.add_route(
        'api.clients.setactive',
        '/api/clients/active'
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
        'api.clients.users.all',
        '/api/clients/users/all'
    )

    config.add_route(
        'api.clients.users.add',
        '/api/clients/users/add'
    )