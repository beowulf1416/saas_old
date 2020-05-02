'use strict';

class AdminClients {

    static add(name, address, func) {
        fetch('/api/admin/clients/add', {
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
        .then((response) => response.json())
        .then((data) => func ? func(data) : console.log(data));
    }

    static all(func) {
        fetch('/api/admin/clients/all', {
            method: 'POST',
            credentials: 'same-origin'
        })
        .then((response) => response.json())
        .then((data) => func ? func(data) : console.log(data));
    }

    static users(clientId, func) {
        fetch('/api/admin/clients/users', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId
            })
        })
        .then((response) => response.json())
        .then((data) => func ? func(data) : console.log(data));
    }
}

export { AdminClients };