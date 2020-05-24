import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: saas.app.modules.accounting.views')