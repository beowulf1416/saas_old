'use strict';

class Roles {
    static all(clientId) {
        return fetch('/api/clients/roles/all', {
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

    static add(clientId, name) {
        return fetch('/api/clients/roles/add', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                name: name
            })
        })
        .then((r) => r.json());
    }

    static setActive(roleId, active) {
        return fetch('/api/clients/roles/active', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                roleId: roleId,
                active: active
            })
        })
        .then((r) => r.json());
    }
}
export { Roles };