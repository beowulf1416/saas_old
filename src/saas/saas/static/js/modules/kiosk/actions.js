'use strict';
import { showInTab } from '/static/js/ui/ui.js';
(function(){
    console.log('kiosk actions');

    window.actions = window.actions ? window.actions : {};

    window.actions['kiosk.dashboard'] = function() {
        const client_id = window.clientId;
    };

    window.actions['kiosk.clients'] = function() {
        const client_id = window.clientId;
    };
})();