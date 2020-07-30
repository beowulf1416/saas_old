'use strict';
import { Util } from '/static/js/util.js';
class InventoryWarehouse {
    
    static add(clientId = '', warehouseId = '', name = '', address = '') {
        return Util.fetch('/api/inventory/warehouses/add', {
            clientId: clientId,
            warehouseId: warehouseId,
            name: name,
            address: address
        });
    }

    static update(clientId = '', warehouseId = '', name = '', address = '') {
        return Util.fetch('/api/inventory/warehouses/update', {
            clientId: clientId,
            warehouseId: warehouseId,
            name: name,
            address: address
        });
    }

    static all(clientId = '') {
        return Util.fetch('/api/inventory/warehouses/all', {
            clientId: clientId
        });
    }

    static filter(clientId = '', filter = '') {
        return Util.fetch('/api/inventory/warehouses/filter', {
            clientId: clientId,
            filter: filter
        });
    }

    static get(clientId = '', warehouseId = '') {
        return Util.fetch('/api/inventory/warehouses/get', {
            clientId: clientId,
            warehouseId: warehouseId
        });
    }
}
export { InventoryWarehouse };