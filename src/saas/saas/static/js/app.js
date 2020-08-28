'use strict';
const App = {
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
    }
};

export { App };

(function() {
    window.app = window.app ? window.app : App;
})();