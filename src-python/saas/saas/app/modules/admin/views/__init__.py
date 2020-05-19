def includeme(config):
    config.add_route(
        'admin.dashboard',
        '/admin'
    )

    config.add_route(
        'admin.clients',
        '/admin/clients'
    )