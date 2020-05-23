import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: saas.app.modules.common')

    config.include('saas.app.modules.common.stores')