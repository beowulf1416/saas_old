'use script';
import { Util } from '/static/js/util.js';
class Vendors {

    static add(clientId = '', vendorId = '', name = '', address = '', countryId = '') {
        return Util.fetch('/api/purchasing/vendors/add', {
            clientId: clientId,
            vendorId: vendorId,
            name: name,
            address: address,
            countryId: countryId
        });
    }

    static update(clientId = '', vendorId = '', name = '', address = '', countryId = '') {
        return Util.fetch('/api/purchasing/vendors/update', {
            clientId: clientId,
            vendorId: vendorId,
            name: name,
            address: address,
            countryId: countryId
        });
    }

    static assignOrganization(clientId = '', vendorId = '', organizationId = '') {
        return Util.fetch('/api/purchasing/vendors/assign', {
            clientId: clientId,
            vendorId: vendorId,
            organizationId: organizationId
        });
    }

    static filter(clientId = '', filter = '') {
        return Util.fetch('/api/purchasing/vendors/filter', {
            clientId: clientId,
            filter: filter
        });
    }

    static get(clientId = '', vendorId = '') {
        return Util.fetch('/api/purchasing/vendors/get', {
            clientId: clientId,
            vendorId: vendorId
        })
    }
}
export { Vendors };