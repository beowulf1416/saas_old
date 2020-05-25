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
}
export { Accounts };