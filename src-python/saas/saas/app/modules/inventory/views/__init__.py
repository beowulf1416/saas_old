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