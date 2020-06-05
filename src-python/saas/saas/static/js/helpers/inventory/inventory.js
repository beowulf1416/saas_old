'use strict';

class Inventory {

    static uoms() {
        return fetch('/api/inventory/uom/all', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((r) => r.json());
    }
}
export { Inventory };