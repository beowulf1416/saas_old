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

    window.actions['hr.team.explorer'] = function() {
        const client_id = window.clientId;
        showInTab('team-explorer', 'Team Explorer', `<team-explorer client-id="${client_id}"></team-explorer>`);
    };

    window.actions['hr.time.entries'] = function() {
        const client_id = window.clientId;
        showInTab('time-entries', 'Time Entries', `<time-entries client-id="${client_id}"></time-entries>`);
    };
})();