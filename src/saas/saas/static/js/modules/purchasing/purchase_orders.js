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
}
export { PurchaseOrders };