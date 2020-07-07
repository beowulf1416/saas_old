import logging
log = logging.getLogger(__name__)


def includeme(config):
    log.info('including: saas.app.modules.purchasing.views.api')

    # purchase orders
    config.add_route(
        'api.purchasing.purchase.orders.save',
        '/api/purchasing/purchase/orders/save'
    )

    config.add_route(
        'api.purchasing.purchase.orders.filter',
        '/api/purchasing/purchase/orders/filter'
    )

    config.add_route(
        'api.purchasing.purchase.orders.get',
        '/api/purchasing/purchase/orders/get'
    )

    # vendors
    config.add_route(
        'api.purchasing.vendors.add',
        '/api/purchasing/vendors/add'
    )

    config.add_route(
        'api.purchasing.vendors.filter',
        '/api/purchasing/vendors/filter'
    )

    config.add_route(
        'api.purchasing.vendors.get',
        '/api/purchasing/vendors/get'
    )