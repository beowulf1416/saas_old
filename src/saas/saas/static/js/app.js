'use strict';
import { showInTab } from '/static/js/ui/ui.js';
const App = {
    elements: {},
    actions: {},
    
    registerAction(action) {
        const { name, func } = action;
        if (name in this.actions) {
            this.actions[name].push(func);
        } else {
            this.actions[name] = [func];
        }
    },

    executeAction(name, params = {}) {
        if (name in this.actions) {
            this.actions[name].forEach((f) => {
                try {
                    f(params);
                } catch(e) {
                    console.error(e);
                }
            });
        } else {
            console.log(`'${name}' action does not exist`);
        }
    },

    registerElements(elements) {
        this.elements = elements;
    },

    showInTab(element) {
        console.log('//TODO showInTab()');
    }
};

export { App };

(function() {
    window.app = window.app ? window.app : App;
})();