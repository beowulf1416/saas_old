import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore

from uuid import UUID


class ItemsStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(ItemsStore, self).__init__(manager, name)

    def add(self, clientId: UUID, item: dict):
        '''add an inventory item
        '''
        try:
            result = super(ItemsStore, self).runProcTransactional('inventory.item_add', [
                clientId,
                item['name'],
                item['description'],
                item['make'],
                item['brand'],
                item['model'],
                item['version'],
                item['sku'],
                item['upc'],
                item['length'],
                item['width'],
                item['height'],
                item['weight'],
                item['perishable'],
                item['hazardous']
            ])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to add inventory item')

    def filterItems(self, clientId: UUID, filter: str):
        '''retrieve all matching inventory items
        '''
        try:
            result = super(ItemsStore, self).runProc('inventory.items_filter', [clientId, filter])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('An error occured while retrieving account types')