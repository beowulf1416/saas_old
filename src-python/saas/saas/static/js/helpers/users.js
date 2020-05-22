'use strict';

class Users {

    static all(clientId) {
        return fetch('/api/clients/users/all', {
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

    static addUserToClient(clientId, email) {
        return fetch('/api/clients/users/add', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                email: email
            })
        })
        .then((r) => r.json());
    }

    static removeUserFromClient(clientId, userId) {
        return fetch('/api/clients/users/remove', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                userId: userId
            })
        })
        .then((r) => r.json());
    }

    static getRoles(clientId, userId) {
        return fetch('/api/clients/users/roles/all', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                userId: userId
            })
        })
        .then((r) => r.json());
    }

    static addRoles(clientId, userId, roleIds) {
        return fetch('/api/clients/users/roles/add', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                userId: userId,
                roleIds: roleIds
            })
        })
        .then((r) => r.json());
    }

    static removeRole(clientId, userId, roleId) {
        return fetch('/api/clients/users/roles/remove', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                userId: userId,
                roleId: roleId
            })
        })
        .then((r) => r.json());
    }
}
export { Users };