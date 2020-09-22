'use strict';
import { App } from '/static/js/app.js';
(function(app){
    console.log('inventory actions');
    app.registerAction([
        {
            name: 'inventory.items',
            func: function() {
                const client_id = window.clientId;
                app.showInTab('inventory-items', 
                    'Items', 
                    `<items-explorer client-id="${client_id}"></items-explorer>`, 
                    'items-explorer');
            }
        },
        {
            name: 'inventory.transactions.receiving',
            func: function() {
                const client_id = window.clientId;
                app.showInTab('receiving-dashboard', 'Receiving', `<receiving-dashboard client-id="${client_id}"></receiving-dashboard>`, 'receiving-dashboard');
            }
        }
    ]);

    window.actions = window.actions ? window.actions : {};
    // window.actions['inventory.items'] = function() {
    //     const client_id = window.clientId;
    //     showInTab('inventory-items', 'Items', `<items-explorer client-id="${client_id}"></items-explorer>`);
    // };

    // window.actions['inventory.transactions.receiving'] = function() {
    //     const client_id = window.clientId;
    //     showInTab('receiving-dashboard', 'Receiving', `<receiving-dashboard client-id="${client_id}"></receiving-dashboard>`);
    // };

    window.actions['inventory.warehouses'] = function() {
        const client_id = window.clientId;
        showInTab('inventory-warehouses', 'Warehouses', `<warehouse-explorer client-id="${client_id}"></warehouse-explorer>`);
    };

    window.actions['inventory.facilities'] = function() {
        const client_id = window.clientId;
        showInTab('inventory-facilities', 'Facilities', `<facility-browser client-id="${client_id}"></facility-browser>`);
    };

    window.actions['inventory.locations'] = function() {
        const client_id = window.clientId;
        showInTab('inventory-locations', 'Locations', `<location-explorer client-id="${client_id}"></location-explorer>`);
    };
})(window.app = window.app ? window.app : App);