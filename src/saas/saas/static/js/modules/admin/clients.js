'use strict';
import { Util } from '/static/js/util.js';
class Clients {
    static getAll() {
        return Util.fetch('/api/clients/all', {});
        // return fetch('/api/clients/all', {
        //     method: 'POST',
        //     credentials: 'same-origin',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        // })
        // .then((r) => r.json());
    }

    // TODO include client id in params
    static add(name = '', address = '', countryId = '', currencyId = '') {
        return Util.fetch('/api/clients/add', {
            name: name,
            address: address,
            countryId: countryId,
            currencyId: currencyId
        });
        // return fetch('/api/clients/add', {
        //     method: 'POST',
        //     credentials: 'same-origin',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         name: name,
        //         address: address,
        //         countryId: country
        //     })
        // })
        // .then((r) => r.json());
    }

    static update(clientId = '', name = '', address = '', countryId = '', currencyId = '') {
        return Util.fetch('/api/clients/update', {
            clientId: clientId,
            name: name,
            address: address,
            countryId: country,
            currencyId: currencyId

        });
        // return fetch('/api/clients/update', {
        //     method: 'POST',
        //     credentials: 'same-origin',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         clientId: clientId,
        //         name: name,
        //         address: address,
        //         countryId: country
        //     })
        // })
        // .then((r) => r.json());
    }

    static get(clientId) {
        return Util.fetch('/api/clients/get', {
            clientId: clientId
        });
        // return fetch('/api/clients/get', {
        //     method: 'POST',
        //     credentials: 'same-origin',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         clientId: clientId
        //     })
        // })
        // .then((r) => r.json());
    }

    static setActive(clientId = '', active = '') {
        return Util.fetch('/api/clients/active', {
            clientId: clientId,
            active: active
        });
        // return fetch('/api/clients/active', {
        //     method: 'POST',
        //     credentials: 'same-origin',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         clientId: clientId,
        //         active: active
        //     })
        // })
        // .then((r) => r.json());
    }

    static filter(filter = '') {
        return Util.fetch('/api/clients/filter', {
            filter: filter
        });
        // return fetch('/api/clients/filter', {
        //     method: 'POST',
        //     credentials: 'same-origin',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         filter: filter
        //     })
        // })
        // .then((r) => r.json());
    }
}
export { Clients };