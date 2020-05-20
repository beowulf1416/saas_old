def includeme(config):
    config.add_route(
        'admin.dashboard',
        '/admin'
    )

    config.add_route(
        'admin.clients',
        '/admin/clients'
    )

    config.add_route(
        'admin.clients.list',
        '/admin/clients/list'
    )

    config.add_route(
        'admin.clients.add',
        '/admin/clients/add'
    )

    config.add_route(
        'admin.clients.client',
        '/admin/clients/{client}'
    )

    config.add_route(
        'admin.clients.roles',
        '/admin/clients/{client}/roles'
    )

    config.add_route(
        'admin.clients.users',
        '/admin/clients/{client}/users'
    )