'use strict';

class InventoryUOM {

    static all(clientId) {
        return fetch('/api/inventory/uom/all', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId
            })
        })
        .then((r) => r.json());
    }
}