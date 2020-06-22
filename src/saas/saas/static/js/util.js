'use strict';

class Util {

    static generateId() {
        return Math.random().toString(16).slice(10);
    }

    static fetch(url = '', params = {}) {
        return fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        .then((r) => r.json());
    }
}
export { Util };