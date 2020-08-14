'use strict';
import { Util } from '/static/js/util.js';
class PurchaseOrders {

    // static save(order = {}) {
    //     return Util.fetch('/api/purchasing/purchase/orders/save', order);
    // }

    static add(order = {}) {
        return Util.fetch('/api/purchasing/purchase/orders/add', order);
    }

    static update(order = {}) {
        return Util.fetch('/api/purchasing/purchase/orders/update', order);
    }

    static filter(clientId = '', filter = '') {
        return Util.fetch('/api/purchasing/purchase/orders/filter', {
            clientId: clientId,
            filter: filter
        })
    }

    static get(clientId = '', purchaseOrderId = '') {
        return Util.fetch('/api/purchasing/purchase/orders/get', {
            clientId: clientId,
            purchaseOrderId: purchaseOrderId
        });
    }
}
export { PurchaseOrders };