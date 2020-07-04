'use script';
import { Util } from '/static/js/util.js';
class Vendors {

    static add(clientId = '', vendorId = '', name = '', address = '', countryId = '') {
        return Util.fetch('/api/inventory/vendors/add', {
            clientId: clientId,
            vendorId: vendorId,
            name: name,
            address: address,
            countryId: countryId
        });
    }
}