'use strict';
import { AdminClientsService } from '/static/js/services/admin.clients.js';
import { showInTab } from '/static/js/ui/ui.js';
(function(){
    const tab = document.querySelector('tab-container');

    window.services = window.services ? window.services : {};
    window.services['admin.clients'] = AdminClientsService;

    window.actions = window.actions ? window.actions : {};
    window.actions['admin.clients'] = function() {
        showInTab('admin.clients', 'Clients', '<clients-table show-new show-edit></clients-table>');
    };

    window.actions['admin.roles'] = function() {
        showInTab('admin.roles', 'Roles', '<client-roles></client-roles>');
    };

    window.actions['admin.users'] = function() {
        showInTab('admin.users', 'Users', '<client-users></client-users>');
    };
})();