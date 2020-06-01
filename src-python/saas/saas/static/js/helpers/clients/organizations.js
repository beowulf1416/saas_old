'use strict';

class Organizations {
    static add(name, description) {
        return fetch('/api/clients/organizations/add', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                description: description
            })
        })
        .then((r) => r.json());
    }
}
export { Organizations }