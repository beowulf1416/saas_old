import logging
log = logging.getLogger(__name__)

from saas.app.core.services.module import BaseModule


class InventoryModule(BaseModule):

    def getDescriptor(self):
        return {
            'name': 'inventory',
            'help': 'Inventory Module',
            'template': 'saas.app.modules.inventory:templates/module.html',
            'icon': '<span class="material-icons">view_quilt</span>'
        }