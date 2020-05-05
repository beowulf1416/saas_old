'use strict';

class Clients {

    static select(clientId, func) {
        fetch('/api/clients/select', {
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

export { Clients };