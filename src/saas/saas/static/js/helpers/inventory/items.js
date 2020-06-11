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

    static get(clientId = '', itemId = '') {

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
                length_unit_id: item.length_unit_id,
                width: item.width,
                width_unit_id: item.width_unit_id,
                height: item.height,
                height_unit_id: item.height_unit_id,
                weight: item.weight,
                weight_unit_id: item.weight_unit_id,
                perishable: item.perishable,
                hazardous: item.hazardous
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