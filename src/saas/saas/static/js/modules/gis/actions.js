'use strict';
import { showInTab } from '/static/js/ui/ui.js';
(function(){
    console.log('gis actions');
    
    window.actions = window.actions ? window.actions : {};
    window.actions['gis.editor'] = function() {
        const client_id = window.clientId;
        showInTab('gis-editor', 'GIS', `<gis-editor client-id="${client_id}"></gis-editor>`);
    };
})();