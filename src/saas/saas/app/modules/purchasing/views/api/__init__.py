import logging
log = logging.getLogger(__name__)


def includeme(config):
    log.info('including: saas.app.modules.purchasing.views.api')

    config.add_route(
        'api.purchasing.purchase.orders.save',
        '/api/purchasing/purchase/orders/save'
    )