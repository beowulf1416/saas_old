import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: saas.app.modules.common.view.api')

    config.add_route(
        'api.common.countries',
        '/api/common/countries'
    )