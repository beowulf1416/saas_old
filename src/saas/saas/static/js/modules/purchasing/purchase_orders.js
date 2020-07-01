'use strict';
import { Util } from '/static/js/util.js';
class PurchaseOrders {

    static save(order = {}) {
        // return fetch('/api/purchasing/purchase/orders/save', {
        //     method: 'POST',
        //     credentials: 'same-origin',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(order)
        // })
        // .then((r) => r.json());
        return Util.fetch('/api/purchasing/purchase/orders/save', order);
    }

    static filter(clientId = '', filter = '') {
        // return fetch('/api/purchasing/purchase/orders/filter', {
        //     method: 'POST',
        //     credentials: 'same-origin',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         clientId: clientId,
        //         filter: filter
        //     })
        // })
        // .then((r) => r.json());
        return Util.fetch('/api/purchasing/purchase/orders/filter', {
            clientId: clientId,
            filter: filter
        })
    }
}
export { PurchaseOrders };