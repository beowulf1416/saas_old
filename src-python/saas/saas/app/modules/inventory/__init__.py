import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service
from saas.app.modules.inventory.module import InventoryModule


def includeme(config):
    log.info('including: saas.app.modules.inventory')    

    config.include('saas.app.modules.inventory.stores')
    config.include('saas.app.modules.inventory.views')
    config.include('saas.app.modules.inventory.views.api')

    config.include('saas.app.modules.inventory.views.transactions')

    services = get_service(None)
    modules = services['modules']
    modules['inventory'] = InventoryModule()