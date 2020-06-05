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

    navigators = services['navigators']
    navigators['inventory'] = {
        'title': 'Inventory',
        'help': 'Manage Inventory',
        'icon': '<span class="material-icons">view_quilt</span>',
        'template': 'saas.app.modules.inventory:templates/module.html'
    }

    page_actions = services['page.actions']
    # page_actions['inventory.items'] = 'showInventoryItems'
    # page_actions['inventory.transactions.receiving'] = 'showInventoryTransactionsReceiving'
    page_actions['inventory.items'] = 'function(){ console.log(\'inventory items action\'); }'
    page_actions['inventory.transactions.receiving'] = 'function(){ console.log(\'inventory transactions receiving action\'); }'