'use strict';
import { AdminClientsService } from '/static/js/services/admin.clients.js';
(function(){
    const tab = document.querySelector('tab-container');

    window.services = window.services ? window.services : {};
    window.services['admin.clients'] = AdminClientsService;

    window.actions = window.actions ? window.actions : {};
    window.actions['admin.clients'] = function() {
        tab.addTab('admin.clients', 'Clients', '<clients-table show-new show-edit></clients-table>');
    };

    window.actions['admin.roles'] = function() {
        tab.addTab('admin.roles', 'Roles', '<client-roles></client-roles>');
    };
})();