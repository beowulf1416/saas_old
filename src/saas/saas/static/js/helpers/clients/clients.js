'use strict';

class Clients {
    static getAll() {
        return fetch('/api/clients/all', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
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
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                address: address
            })
        })
        .then((r) => r.json());
    }

    static get(clientId) {
        return fetch('/api/clients/get', {
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

    static setActive(clientId, active) {
        return fetch('/api/clients/active', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                active: active
            })
        })
        .then((r) => r.json());
    }

    static filter(filter = '') {
        return fetch('/api/clients/filter', {
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
export { Clients };