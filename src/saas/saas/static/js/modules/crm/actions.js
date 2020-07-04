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
        showInTab('organization-explorer', 'Organizations', `<organization-explorer client-id="${client_id}"></organization-explorer>`);
    };

    window.actions['crm.people'] = function() {
        const client_id = window.clientId;
        showInTab('contact-explorer', 'Contacts', `<contact-explorer client-id="${client_id}"><contact-explorer>`);
    };
})();