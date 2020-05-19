'use strict';

class Clients {
    static getAll() {
        return fetch('/api/clients/all', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((r) => r.json());
    }
}
export { Clients };