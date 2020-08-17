'use strict';
import { Util } from '/static/js/util.js';
class Clients {
    static getAll() {
        return Util.fetch('/api/clients/all', {});
    }

    static add(clientId = '', name = '', address = '', countryId = '', currencyId = '') {
        return Util.fetch('/api/clients/add', {
            clientId: clientId,
            name: name,
            address: address,
            countryId: countryId,
            currencyId: currencyId
        });
    }

    static update(clientId = '', name = '', address = '', countryId = '', currencyId = '') {
        return Util.fetch('/api/clients/update', {
            clientId: clientId,
            name: name,
            address: address,
            countryId: countryId,
            currencyId: currencyId

        });
    }

    static get(clientId) {
        return Util.fetch('/api/clients/get', {
            clientId: clientId
        });
    }

    static setActive(clientId = '', active = '') {
        return Util.fetch('/api/clients/active', {
            clientId: clientId,
            active: active
        });
    }

    static filter(filter = '') {
        return Util.fetch('/api/clients/filter', {
            filter: filter
        });
    }
}
export { Clients };