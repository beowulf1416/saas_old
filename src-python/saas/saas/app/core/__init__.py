import logging

log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: core')

    config.include('saas.app.core.views')