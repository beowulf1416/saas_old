'use strict';
import { showInTab } from '/static/js/ui/ui.js';
(function(){
    console.log('purchasing actions');

    window.actions = window.actions ? window.actions : {};
    window.actions['purchasing.dashboard'] = function() {
        // const client_id = window.clientId;
        // showInTab('purchasing-dashboard', 'Dashboard', `<items-explorer client-id="${client_id}"></items-explorer>`);
        console.log('purchasing.dashboard');
    };

    window.actions['purchasing.orders'] = function() {
        const client_id = window.clientId;
        showInTab('purchase-orders', 'Purchase Orders', `<purchase-orders client-id="${client_id}"></purchase-orders>`);
    };
})();