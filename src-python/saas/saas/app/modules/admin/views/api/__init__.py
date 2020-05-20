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
        'api.clients.setactive',
        '/api/clients/active'
    )