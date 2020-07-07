'use strict';

class InventoryWarehouse {
    
    static add(clientId = '', warehouseId = '', name = '', address = '') {
        return fetch('/api/inventory/warehouses/add', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                warehouseId: warehouseId,
                name: name,
                address: address
            })
        })
        .then((r) => r.json());
    }

    static all(clientId = '') {
        return fetch('/api/inventory/warehouses/all', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId
            })
        })
        .then((r) => r.json());
    }

    static filter(clientId = '', filter = '') {
        return fetch('/api/inventory/warehouses/filter', {
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

    static get(clientId = '', warehouseId = '') {
        return fetch('/api/inventory/warehouses/get', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                warehouseId: warehouseId
            })
        })
        .then((r) => r.json());
    }
}
export { InventoryWarehouse };