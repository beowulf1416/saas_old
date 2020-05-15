'use strict';

class Inventory {

    static itemAdd(clientId, item) {
        return fetch('/api/inventory/items/add', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                item: item
            })
        })
        .then((response) => response.json());
    }

    static items(clientId, filter) {
        return fetch('/api/inventory/items/filter', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                filter: filter
            })
        })
        .then((response) => response.json());
    }

    static criticalItems(clientId, filter) {
        return fetch('/api/inventory/items', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                filter: filter,
                critical: true
            })
        })
        .then((response) => response.json());
    }

    static itemById(itemId) {
        return fetch('/api/inventory/items/get', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                itemId: itemId
            })
        })
        .then((response) => response.json());
    }
}
export { Inventory };