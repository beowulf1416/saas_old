import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore

from uuid import UUID


class PurchaseOrderStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(PurchaseOrderStore, self).__init__(manager, name)

    def save(self, order = {}):
        cn = super(PurchaseOrderStore, self).begin()
        try:
            client_id = order['clientId']
            purchase_order_id = order['purchaseOrderId']

            c = cn.cursor()
            c.callproc('purchasing.purchase_order_save', [
                client_id,
                purchase_order_id,
                order['description'],
                order['warehouseId'],
                order['instructions']
            ])

            c = cn.cursor()
            items = order['items']
            for item in items:
                status = item['status'] if 'status' in item else None
                if status == 'new':
                    c.callproc('purchasing.purchase_order_item_add', [
                        client_id,
                        purchase_order_id,
                        item['id'],
                        item['description'],
                        item['quantity'],
                        item['uom']
                    ])
                elif status == 'remove':
                    c.callproc('purchasing.purchase_order_item_remove', [
                        client_id,
                        purchase_order_id,
                        item['id']
                    ])
                else:
                    c.callproc('purchasing.purchase_order_item_update', [
                        client_id,
                        purchase_order_id,
                        item['id'],
                        item['description'],
                        item['quantity'],
                        item['uom']
                    ])
            super(PurchaseOrderStore, self).commit(cn)
        except Exception as e:
            super(PurchaseOrderStore, self).rollback(cn)
            log.error(e)
            raise Exception('Unable to save purchase order')

    def filter(self, client_id: UUID, filter: str):
        try:
            result = super(PurchaseOrderStore, self).runProc('purchasing.purchase_orders_filter', [
                client_id,
                '%{0}%'.format(filter)
            ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve purchase orders')

    def get(self, client_id: UUID, order_id: UUID):
        try:
            [result, ] = super(PurchaseOrderStore, self).runProc('purchasing.purchase_order_get', [
                client_id,
                order_id
            ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve purchase order')

    def get_items(self, client_id: UUID, order_id: UUID):
        try:
            result = super(PurchaseOrderStore, self).runProc('purchasing.purchase_order_items_get', [
                client_id,
                order_id
            ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve purchase order items')