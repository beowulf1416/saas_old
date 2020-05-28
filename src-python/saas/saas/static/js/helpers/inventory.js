'use strict';

class Inventory {

    static findItems(clientId = '', filter = '') {
        return fetch('/api/inventory/items/filter', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filter: filter
            })
        })
        .then((r) => r.json());
    }
}
export { Inventory };