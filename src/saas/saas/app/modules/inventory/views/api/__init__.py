import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: saas.app.modules.inventory.views.api')

    config.add_route(
        'api.inventory.uom.all',
        '/api/inventory/uom/all'
    )

    config.add_route(
        'api.inventory.item.get',
        '/api/inventory/item/get'
    )

    config.add_route(
        'api.inventory.items.filter',
        '/api/inventory/items/filter'
    )

    config.add_route(
        'api.inventory.items.add',
        '/api/inventory/items/add'
    )

    config.add_route(
        'api.inventory.items.update',
        '/api/inventory/items/update'
    )

    config.add_route(
        'api.inventory.items.substitutes',
        '/api/inventory/items/substitutes'
    )

    config.add_route(
        'api.inventory.items.substitutes.add',
        '/api/inventory/items/substitutes/add'
    )

    # warehouses
    config.add_route(
        'api.inventory.warehouses.add',
        '/api/inventory/warehouses/add'
    )
    
    config.add_route(
        'api.inventory.warehouses.all',
        '/api/inventory/warehouses/all'
    )

    config.add_route(
        'api.inventory.warehouses.filter',
        '/api/inventory/warehouses/filter'
    )

    config.add_route(
        'api.inventory.warehouses.get',
        '/api/inventory/warehouses/get'
    )

    # vendors
    config.add_route(
        'api.inventory.vendors.add',
        '/api/inventory/vendors/add'
    )

    config.add_route(
        'api.inventory.vendors.filter',
        '/api/inventory/vendors/filter'
    )