import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: saas.app.modules.clients')

    config.include('saas.app.modules.clients.stores')
    config.include('saas.app.modules.clients.views')
    config.include('saas.app.modules.clients.views.api')
    