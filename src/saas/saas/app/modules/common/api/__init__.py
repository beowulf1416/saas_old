import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: saas.app.modules.common.api')

    # countries
    config.add_route(
        'api.common.countries',
        '/api/common/countries'
    )

    config.add_route(
        'api.common.countries.get',
        '/api/common/countries/get'
    )

    # currencies
    config.add_route(
        'api.common.currencies',
        '/api/common/currencies'
    )

    config.add_route(
        'api.common.currencies.get',
        '/api/common/currencies/get'
    )

    # uoms
    config.add_route(
        'api.common.uom.filter',
        '/api/common/uom/filter'
    )

    config.add_route(
        'api.common.uom.get',
        '/api/common/uom/get'
    )