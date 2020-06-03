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
                item['make'] if 'make' in item else '',
                item['brand'] if 'brand' in item else '',
                item['model'] if 'model' in item else '',
                item['version'] if 'version' in item else '',
                item['sku'] if 'sku' in item else '',
                item['upc'] if 'upc' in item else '',
                item['length'] if 'length' in item else 0,
                item['width'] if 'width' in item else 0,
                item['height'] if 'height' in item else 0,
                item['weight'] if 'weight' in item else 0,
                item['perishable'] if 'perishable' in item else False,
                item['hazardous'] if 'hazardous' in item else False
            ])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to add inventory item')

    def filterItems(self, clientId: UUID, filter: str, numItems: int, pageNum: int):
        '''retrieve all matching inventory items
        '''
        try:
            result = super(ItemsStore, self).runProc('inventory.items_filter', [clientId, f'%{filter}%', numItems, pageNum])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('An error occured while retrieving inventory items')