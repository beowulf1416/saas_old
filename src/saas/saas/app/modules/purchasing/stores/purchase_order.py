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
            purchase_order_id = order['purchaseOrderId'] if 'purchaseOrderId' in order else None

            c = cn.cursor()
            if purchase_order_id is None:
                # update
                c.callproc('purchasing.purchase_order_update', [
                    client_id,
                    purchase_order_id,
                    order['description'],
                    order['warehouseId']
                ])
            else:
                # add
                c.callproc('purchasing.purchase_order_add', [
                    client_id,
                    order['description'],
                    order['warehouseId']
                ])
                [(purchase_order_id, ), ] = c.fetchall()

            c = cn.cursor()
            c.callproc('purchasing.purchase_order_items_remove', [client_id, purchase_order_id])

            c = cn.cursor()
            items = order['items']
            for item in items:
                c.callproc('purchasing.purchase_order_item_add', [
                    client_id,
                    purchase_order_id,
                    item['description'],
                    item['quantity'],
                    item['uom']
                ])
                # c.execute("select * from purchasing.purchase_order_item_add('{0}'::uuid,'{1}'::uuid,'{2}'::text,{3}::numeric,{4})".format(
                #     client_id,
                #     purchase_order_id,
                #     item['description'],
                #     item['quantity'],
                #     item['uom']
                # ))
            super(PurchaseOrderStore, self).commit(cn)
        except Exception as e:
            super(PurchaseOrderStore, self).rollback(cn)
            log.error(e)
            raise Exception('Unable to save purchase order')