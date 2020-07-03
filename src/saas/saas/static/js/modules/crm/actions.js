'use strict';
import { showInTab } from '/static/js/ui/ui.js';
(function(){
    console.log('crm actions');

    window.actions = window.actions ? window.actions : {};
    window.actions['crm.dashboard'] = function() {
        const client_id = window.clientId;
        console.log('crm.dashboard');
    };

    window.actions['crm.organizations'] = function() {
        const client_id = window.clientId;
        console.log('crm.organizations');
    };

    window.actions['crm.people'] = function() {
        const client_id = window.clientId;
        console.log('crm.people');
    };
})();