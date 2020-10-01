'use strict';
import { showInTab } from '/static/js/ui/ui.js';
import { App } from '/static/js/app.js';
(function(app){
    console.log('clients actions');
    app.registerAction([
        {
            name: 'client.info',
            func: function() {
                const client_id = window.clientId;
                app.showInTab('client-editor',
                    'Client',
                    `<client-editor client-id="${client_id}"></client-editor>`,
                    'client-editor'
                );
            }
        }
    ]);
    
    window.actions = window.actions ? window.actions : {};
    window.actions['client.users'] = function() {
        const client_id = window.clientId;
        console.warn('//TODO');
    };
    window.actions['client.organizations'] = function() {
        const client_id = window.clientId;
        showInTab('organization-tree', 'Organizations', `<organization-tree client-id="${client_id}"></organization-tree>`);
    };
    // window.actions['client.info'] = function() {
    //     const client_id = window.clientId;
    //     showInTab('client-editor', 'Client', `<client-editor client-id="${client_id}"></client-editor>`);
    // };
})(window.app = window.app ? window.app : App);