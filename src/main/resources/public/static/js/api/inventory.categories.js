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

    static add(clientId, name) {
        return fetch('/api/inventory/categories/add', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                name: name
            })
        })
        .then((r) => r.json());       
    }
}
export { InventoryCategories };