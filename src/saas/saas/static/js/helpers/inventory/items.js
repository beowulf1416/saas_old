'use strict';

class InventoryItem {

    static find(clientId = '', filter = '', numItems = 20, pageNum = 1) {
        return fetch('/api/inventory/items/filter', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                filter: filter,
                numItems: numItems,
                pageNum: pageNum
            })
        })
        .then((r) => r.json());
    }

    static add(clientId = '', item = {}) {
        return fetch('/api/inventory/items/add', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                name: item.name,
                description: item.description,
                sku: item.sku,
                upc: item.upc,
                make: item.make,
                brand: item.brand,
                model: item.model,
                version: item.version,
                length: item.length,
                width: item.width,
                height: item.height,
                weight: item.weight
            })
        })
        .then((r) => r.json());
    }

    static substitutes(clientId = '', itemId = '', substituteItemId = '') {
        return fetch('/api/inventory/items/substitutes', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                itemId: itemId,
                substituteItemId: substituteItemId
            })
        })
        .then((r) => r.json());
    }
}
export { InventoryItem };