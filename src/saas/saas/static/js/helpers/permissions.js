'use strict';

class Permissions {

    static all() {
        return fetch('/api/clients/permissions/all', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((r) => r.json());
    }
}
export { Permissions };