'use strict';
import { showInTab } from '/static/js/ui/ui.js';
import { App } from '/static/js/app.js';
(function(app){
    console.log('user actions');

    window.actions = window.actions ? window.actions : {};
    // window.actions['user.dashboard'] = function() {
    //     showInTab('user-dashboard', 'Dashboard', '<user-dashboard></user-dashboard>');
    // };
    // window.actions['user.profile'] = function() {
    //     showInTab('user-profile', 'Profile', '<user-profile></user-profile>');
    // };
    app.registerAction([
        {
            name: 'user.dashboard',
            func: function() {
                app.showInTab('user-dashboard', 'Dashboard', '<user-dashboard></user-dashboard>', 'user-dashboard');
            }
        },
        {
            name: 'user.profile',
            func: function() {
                app.showInTab('user-profile', 'Profile', '<user-profile></user-profile>', 'user-profile');
            }
        }
    ]);
})(window.app ? window.app : App);