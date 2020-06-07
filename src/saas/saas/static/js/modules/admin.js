'use strict';
(function(){
    const tab = document.querySelector('tab-container');

    window.actions = window.actions ? window.actions : {};
    window.actions['admin.clients'] = function() {
        tab.addTab('admin.clients', 'Clients', '<clients-table></clients-table>');
    };
})();