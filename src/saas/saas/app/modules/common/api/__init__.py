import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: saas.app.modules.common.api')

    config.add_route(
        'api.common.countries',
        '/api/common/countries'
    )

    config.add_route(
        'api.common.currencies',
        '/api/common/currencies'
    )