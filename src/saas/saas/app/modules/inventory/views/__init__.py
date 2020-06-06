import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: saas.app.modules.inventory.views')

    config.add_route(
        'inventory.dashboard',
        '/inventory'
    )

    config.add_route(
        'inventory.items.list',
        '/inventory/items/list'
    )

    config.add_route(
        'inventory.items.add',
        '/inventory/items/add'
    )

    config.add_route(
        'inventory.items.groups',
        '/inventory/items/groups'
    )


    config.add_route(
        'inventory.warehouses',
        '/inventory/warehouses'
    )

    config.add_route(
        'inventory.locations',
        '/inventory/locations'
    )