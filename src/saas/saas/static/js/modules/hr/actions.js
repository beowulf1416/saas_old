'use strict';
import { showInTab } from '/static/js/ui/ui.js';
(function(){
    console.log('hr actions');

    window.actions = window.actions ? window.actions : {};
    window.actions['hr.dashboard'] = function() {
        // const client_id = window.clientId;
        // showInTab('purchasing-dashboard', 'Dashboard', `<items-explorer client-id="${client_id}"></items-explorer>`);
        console.log('hr.dashboard');
    }
})();