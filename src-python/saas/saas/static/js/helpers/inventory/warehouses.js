'use strict';

class InventoryWarehouse {
    
    static add(clientId = '', name = '', address = '') {
        return fetch('/api/inventory/warehouses/add', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                name: name,
                address: address
            })
        })
        .then((r) => r.json());
    }
}
export { InventoryWarehouse };