import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: saas.app.modules.common.api')

    # countries
    config.add_route(
        'api.common.countries',
        '/api/common/countries'
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