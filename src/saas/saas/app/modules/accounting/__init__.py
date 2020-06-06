import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: saas.app.modules.accounting')

    config.include('saas.app.modules.accounting.stores')
    config.include('saas.app.modules.accounting.views')
    config.include('saas.app.modules.accounting.views.api')