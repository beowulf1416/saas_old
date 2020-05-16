'use strict';

class InventoryCategories {

    static all(clientId) {
        return fetch('/api/inventory/categories/all', {
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