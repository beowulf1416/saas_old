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
        .then((data) => {
            func(data);
        });
    }
}

export { AdminClients };