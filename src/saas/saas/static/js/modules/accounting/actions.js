'use strict';
import { App } from '/static/js/app.js';
// import { showInTab } from '/static/js/ui/ui.js';
(function(app) {
    console.log('accounting actions');
    app.registerAction([
        {
            name: 'accounting.accounts',
            func: function() {
                const client_id = window.clientId;
                app.showInTab('accounting-accounts', 
                    'Accounts', 
                    `<account-tree client-id="${client_id}"></account-tree>`,
                    'account-tree'
                );
            }
        },
        {
            name: 'accounting.journals',
            func: function() {
                const client_id = window.clientId;
                app.showInTab('accounting-journals', 
                    'Accounting Journals', 
                    `<accounting-journals client-id="${client_id}"></accounting-journals>`,
                    'accounting-journals'
                );
            }
        },
        {
            name: 'accounting.invoice',
            func: function() {
                const client_id = window.clientId;
                app.showInTab('accounting-invoices', 
                    'Invoices', 
                    `<invoice-dashboard client-id="${client_id}"></invoice-dashboard>`,
                    'invoice-dashboard'
                );
            }
        }
    ]);

    // window.actions = window.actions ? window.actions : {};
    // window.actions['accounting.accounts'] = function() {
    //     const client_id = window.clientId;
    //     showInTab('accounting-accounts', 'Accounts', `<account-tree client-id="${client_id}"></account-tree>`);
    // };

    // window.actions['accounting.journals'] = function() {
    //     const client_id = window.clientId;
    //     showInTab('accounting-journals', 'Accounting Journals', `<accounting-journals client-id="${client_id}"></accounting-journals>`);
    // };

    // window.actions['accounting.trial_balance'] = function() {
    //     const client_id = window.clientId;
    // };

    // window.actions['accounting.invoice'] = function() {
    //     const client_id = window.clientId;
    //     showInTab('accounting-invoices', 'Invoices', `<invoice-dashboard client-id="${client_id}"></invoice-dashboard>`);
    // };
})(window.app = window.app ? window.app : App);