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
        .then((r) => {
            if (r.ok) {
                return r.json();
            } else {
                console.error(r);
                return {
                    status: 'error',
                    message: r.statusText
                } 
            }
        })
        .catch(error => {
            console.error(error);
            return {
                status: 'error',
                message: error
            };
        });
    }

    static generate_uuid() {
        return uuidv4();
    }
}
export { Util };