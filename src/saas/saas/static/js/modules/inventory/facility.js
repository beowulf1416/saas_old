'use strict';
import { Util } from '/static/js/util.js';
class Facility {

    static add(clientId = '', 
        facilityId = '',
        name = '',
        description = '',
        address = '',
        countryId = '',
        area = '',
        areaUomId = '') {
        return Util.fetch('/api/inventory/facilities/add', {
            clientId: clientId,
            facilityId: facilityId,
            name: name,
            description: description,
            address: address,
            countryId: countryId,
            area: area,
            areaUomId: areaUomId
        });
    }

    static update(clientId = '', 
        facilityId = '',
        name = '',
        description = '',
        address = '',
        countryId = '',
        area = '',
        areaUomId = '') {
        return Util.fetch('/api/inventory/facilities/update', {
            clientId: clientId,
            facilityId: facilityId,
            name: name,
            description: description,
            address: address,
            countryId: countryId,
            area: area,
            areaUomId: areaUomId
        });
    }

    static get(clientId = '', facilityId = '') {
        return Util.fetch('/api/inventory/facilities/get', {
            clientId: clientId,
            facilityId: facilityId
        });
    }

    static filter(clientId = '', filter = '') {
        return Util.fetch('/api/inventory/facilities/filter', {
            clientId: clientId,
            filter: filter
        });
    }
}
export { Facility };