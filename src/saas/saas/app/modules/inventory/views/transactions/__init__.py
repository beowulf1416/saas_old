import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: saas.app.modules.inventory.views.transactions')

    config.add_route(
        'inventory.transactions.receiving',
        '/inventory/transactions/receiving'
    )