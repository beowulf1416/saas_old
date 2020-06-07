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

    static add(name, address, url) {
        return fetch('/api/clients/add', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                address: address,
                url: url
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
}
export { Clients };