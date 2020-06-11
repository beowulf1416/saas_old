'use strict';

class Inventory {

    static uoms(dimension = '') {
        return fetch('/api/inventory/uom/all', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dimension: dimension
            })
        })
        .then((r) => r.json());
    }
}
export { Inventory };