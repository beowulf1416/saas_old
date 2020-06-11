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
        console.log('// TODO inventory.transactions.receiving');
    };

    window.actions['inventory.warehouses'] = function() {
        console.log('// TODO inventory.warehouses');
    };

    window.actions['inventory.locations'] = function() {
        console.log('// TODO inventory.locations');
    };
})();