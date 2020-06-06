'use strict';

class Accounts {

    static getAccountTypes() {
        return fetch('/api/accounting/accounts/types', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((r) => r.json());
    }

    static add(clientId, typeId, name, description, parentAccountId) {
        return fetch('/api/accounting/accounts/add', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                typeId: typeId,
                name: name,
                description: description,
                parentAccountId: parentAccountId
            })
        })
        .then((r) => r.json());
    }

    static assignParent(clientId, accountId, parentAccountId) {
        return fetch('/api/accounting/accounts/parent/assign', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                accountId: accountId,
                parentAccountId: parentAccountId
            })
        })
        .then((r) => r.json());
    }

    static all(clientId) {
        return fetch('/api/accounting/accounts/all', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
            })
        })
        .then((r) => r.json());
    }

    static getChildren(clientId, parentAccountId) {
        return fetch('/api/accounting/accounts/children', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                accountId: parentAccountId
            })
        })
        .then((r) => r.json());
    }

    static getTree(clientId) {
        return fetch('/api/accounting/accounts/tree', {
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
}
export { Accounts };