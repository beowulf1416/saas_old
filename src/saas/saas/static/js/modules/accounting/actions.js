'use strict';
import { showInTab } from '/static/js/ui/ui.js';
(function() {
    console.log('accounting actions');

    window.actions = window.actions ? window.actions : {};
    window.actions['accounting.accounts'] = function() {
        const client_id = window.clientId;
        showInTab('accounting-accounts', 'Accounts', `<account-tree client-id="${client_id}"></account-tree>`);
    };
})();