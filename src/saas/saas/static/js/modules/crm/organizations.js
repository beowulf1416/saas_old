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

}
export { Organizations };