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

    static add(name, address) {
        return fetch('/api/clients/add', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                address: address
            })
        })
        .then((r) => r.json());
    }

    static setActive(clientId, active) {
        return fetch('/api/clients/active', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                active: active
            })
        })
        .then((r) => r.json());
    }
}
export { Clients };