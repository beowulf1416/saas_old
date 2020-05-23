import logging

log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: saas.app.core')

    config.include('saas.app.core.services')
    config.include('saas.app.core.stores')
    config.include('saas.app.core.views')

    config.include('saas.app.modules.common')
    config.include('saas.app.modules.admin')