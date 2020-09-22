'use strict';
import { App } from '/static/js/app.js';
(function(app){
    console.log('user actions');
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
})(window.app = window.app ? window.app : App);