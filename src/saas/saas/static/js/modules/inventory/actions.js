'use strict';
import { showInTab } from '/static/js/ui/ui.js';
(function(){
    console.log('inventory actions');

    window.actions = window.actions ? window.actions : {};
    window.actions['inventory.items'] = function() {
        const client_id = window.clientId;
        showInTab('inventory-items', 'Items', `<items-explorer client-id="${client_id}"></items-explorer>`);
    };

    window.actions['inventory.transactions.receiving'] = function() {
        const client_id = window.clientId;
        showInTab('receiving-dashboard', 'Receiving', `<receiving-dashboard client-id="${client_id}"></receiving-dashboard>`);
    };

    window.actions['inventory.warehouses'] = function() {
        const client_id = window.clientId;
        showInTab('inventory-warehouses', 'Warehouses', `<warehouse-explorer client-id="${client_id}"></warehouse-explorer>`);
    };

    window.actions['inventory.locations'] = function() {
        const client_id = window.clientId;
        console.log('// TODO inventory.locations');
    };

    window.actions['inventory.vendors'] = function() {
        const client_id = window.clientId;
        showInTab('inventory-vendors', 'Vendors', `<vendor-explorer client-id="${client_id}"><vendor-explorer>`);
    };
})();