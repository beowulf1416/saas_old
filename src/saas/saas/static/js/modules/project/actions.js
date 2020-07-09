'use strict';
import { showInTab } from '/static/js/ui/ui.js';
(function(){
    console.log('project actions');

    window.actions = window.actions ? window.actions : {};
    window.actions['project.dashboard'] = function() {
        const client_id = window.clientId;
        console.log('project.dashboard');
    };

    window.actions['project.projects'] = function() {
        const client_id = window.clientId;
        showInTab('project-explorer', 'Projects', `<project-explorer client-id="${client_id}"></project-explorer>`);
    };
})();