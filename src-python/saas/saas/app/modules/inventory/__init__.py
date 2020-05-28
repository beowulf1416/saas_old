import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: saas.app.modules.inventory')

    config.include('saas.app.modules.inventory.stores')
    config.include('saas.app.modules.inventory.views')
    config.include('saas.app.modules.inventory.views.api')