'use strict';
import { showInTab } from '/static/js/ui/ui.js';
(function() {
    console.log('accounting actions');

    window.actions = window.actions ? window.actions : {};
    window.actions['accounting.accounts'] = function() {
        const client_id = window.clientId;
        showInTab('accounting-accounts', 'Accounts', `<account-tree client-id="${client_id}"></account-tree>`);
    };

    window.actions['accounting.journals'] = function() {
        const client_id = window.clientId;
        showInTab('accounting-journals', 'Accounting Journals', `<accounting-journals client-id="${client_id}"></accounting-journals>`);
    };

    window.actions['accounting.trial_balance'] = function() {
        const client_id = window.clientId;
    };
})();