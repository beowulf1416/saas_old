'use strict';
import { showInTab } from '/static/js/ui/ui.js';
(function(){
    console.log('admin actions');
    
    window.actions = window.actions ? window.actions : {};
    window.actions['admin.clients'] = function() {
        showInTab('admin.clients', 'Clients', '<clients-table show-new show-edit></clients-table>');
    };

    window.actions['admin.roles'] = function() {
        showInTab('admin.roles', 'Roles', '<client-roles></client-roles>');
    };

    window.actions['admin.users'] = function() {
        showInTab('admin.users', 'Users', '<admin-client-users></admin-client-users>');
    };
})();