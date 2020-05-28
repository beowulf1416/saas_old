import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: saas.app.modules.inventory.views.api')

    config.add_route(
        'api.inventory.items.filter',
        '/api/inventory/items/filter'
    )