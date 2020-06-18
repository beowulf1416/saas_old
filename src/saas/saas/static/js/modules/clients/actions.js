'use strict';
import { showInTab } from '/static/js/ui/ui.js';
(function(){
    console.log('clients actions');
    
    window.actions = window.actions ? window.actions : {};
    window.actions['client.organizations'] = function() {
        const client_id = window.clientId;
        // showInTab('admin.clients', 'Clients', '<clients-table show-new show-edit></clients-table>');
        showInTab('organization-tree', 'Organizations', `<organization-tree client-id="${client_id}"></organization-tree>`);
    };
})();