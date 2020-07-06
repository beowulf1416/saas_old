'use strict';
import { Util } from '/static/js/util.js';
class Organizations {

    static save(clientId = '', organizationId = '', name = '', address = '', countryId = '') {
        return Util.fetch('/api/crm/organizations/save', {
            clientId: clientId,
            organizationId: organizationId,
            name: name,
            address: address,
            countryId: countryId
        });
    }

    static filter(clientId = '', filter = '') {
        return Util.fetch('/api/crm/organizations/filter', {
            clientId: clientId,
            filter: filter
        })
    }

    static get(clientId = '', organizationId = '') {
        return Util.fetch('/api/crm/organizations/get', {
            clientId: clientId,
            organizationId: organizationId
        })
    }
}
export { Organizations };