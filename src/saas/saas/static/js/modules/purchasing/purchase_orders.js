'use strict';

class PurchaseOrders {

    static save(order = {}) {
        return fetch('/api/purchasing/purchase/orders/save', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then((r) => r.json());
    }

    static filter(clientId = '', filter = '') {
        return fetch('/api/purchasing/purchase/orders/filter', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                filter: filter
            })
        })
        .then((r) => r.json());
    }
}
export { PurchaseOrders };