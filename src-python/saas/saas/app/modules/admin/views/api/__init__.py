def includeme(config):
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