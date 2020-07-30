'use strict';
import { Util } from '/static/js/util.js';
class Locations {

    static add(
        clientId = '',
        locationId = '',
        warehouseId = '',
        floorId = '',
        aisleId = '',
        shelfId = '',
        rackId = '',
        levelId = '',
        binId = '') {
        return Util.fetch('/api/inventory/locations/add', {
            clientId: clientId,
            locationId: locationId,
            warehouseId: warehouseId,
            floorId: floorId,
            aisleId: aisleId,
            shelfId: shelfId,
            rackId: rackId,
            levelId: levelId,
            binId: binId
        })
    }

    static update(
        clientId = '',
        locationId = '',
        warehouseId = '',
        floorId = '',
        aisleId = '',
        shelfId = '',
        rackId = '',
        levelId = '',
        binId = '') {
        return Util.fetch('/api/inventory/locations/update', {
            clientId: clientId,
            locationId: locationId,
            warehouseId: warehouseId,
            floorId: floorId,
            aisleId: aisleId,
            shelfId: shelfId,
            rackId: rackId,
            levelId: levelId,
            binId: binId
        })
    }

    static filter(clientId = '', filter = '') {
        return Util.fetch('/api/inventory/locations/filter', {
            clientId: clientId,
            filter: filter
        })
    }

    static get(clientId = '', locationId = '') {
        return Util.fetch('/api/inventory/locations/get', {
            clientId: clientId,
            locationId: locationId
        });
    }
}