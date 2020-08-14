'use strict';
import { showInTab } from '/static/js/ui/ui.js';
(function(){
    console.log('hr actions');

    const menu = document.createElement('div');
    menu.classList.add('hr');
    menu.innerHTML = `
        <div class="menu-label">HR</div>
        <ul class="menu-list">
            <li>Test</li>
        </ul>
    `;
    const extension = document.querySelector('.module-user .extensions');
    if (extension) {
        extension.appendChild(menu);
    }
    

    window.actions = window.actions ? window.actions : {};
    window.actions['hr.dashboard'] = function() {
        // const client_id = window.clientId;
        // showInTab('purchasing-dashboard', 'Dashboard', `<items-explorer client-id="${client_id}"></items-explorer>`);
        console.log('hr.dashboard');
    }

    window.actions['hr.shift.explorer'] = function() {
        const client_id = window.clientId;
        showInTab('shift-explorer', 'Shift Explorer', `<shift-explorer client-id="${client_id}"></shift-explorer>`);
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