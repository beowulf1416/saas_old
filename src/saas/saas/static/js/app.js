'use strict';
const App = {
    elements: {},
    actions: {},
    
    registerAction(action) {
        const { name, func } = action;
        if (this.actions[name]) {
            this.actions[name].push(func);
        } else {
            this.actions[name] = [func];
        }
    },

    executeAction(name, params = {}) {
        if (this.actions[name]) {
            this.actions[name].forEach((f) => {
                try {
                    f(params);
                } catch(e) {
                    console.error(e);
                }
            });
        }
    },

    registerElements(elements) {
        this.elements = elements;
    }
};

export { App };

(function() {
    window.app = window.app ? window.app : App;
})();