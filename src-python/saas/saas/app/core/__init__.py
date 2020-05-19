import logging

log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: core')

    config.include('saas.app.core.services')
    config.include('saas.app.core.stores')
    config.include('saas.app.core.views')

    config.include('saas.app.modules.admin.views')