import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: saas.app.modules.inventory.views.api')

    config.add_route(
        'api.inventory.items.filter',
        '/api/inventory/items/filter'
    )

    config.add_route(
        'api.inventory.items.add',
        '/api/inventory/items/add'
    )

    config.add_route(
        'api.inventory.items.substitutes',
        '/api/inventory/items/substitutes'
    )

    config.add_route(
        'api.inventory.items.substitutes.add',
        '/api/inventory/items/substitutes/add'
    )

    config.add_route(
        'api.inventory.warehouses.add',
        '/api/inventory/warehouses/add'
    )
    
    config.add_route(
        'api.inventory.warehouses.all',
        '/api/inventory/warehouses/all'
    )