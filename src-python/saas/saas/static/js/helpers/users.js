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
        return fetch('/api/clients/user/add', {
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
}
export { Users };