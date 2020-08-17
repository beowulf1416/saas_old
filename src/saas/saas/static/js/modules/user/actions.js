'use strict';
import { showInTab } from '/static/js/ui/ui.js';
(function(){
    console.log('user actions');

    window.actions = window.actions ? window.actions : {};
    window.actions['user.profile'] = function() {
        showInTab('user-profile', 'Profile', '<user-profile></user-profile>');
    };
})();