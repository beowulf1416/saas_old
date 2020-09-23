'use strict';
import { showInTab } from '/static/js/ui/ui.js';
const App = {
    elements: {},
    definedElements: {},
    actions: {},
    
    registerAction(action) {
        if (Array.isArray(action)) {
            action.forEach(a => {
                const { name, func } = a;
                if (name in this.actions) {
                    this.actions[name].push(func);
                } else {
                    this.actions[name] = [func];
                }       
            });
        } else {
            const { name, func } = action;
            if (name in this.actions) {
                this.actions[name].push(func);
            } else {
                this.actions[name] = [func];
            }
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
            console.error(`'${name}' action does not exist`);
        }
    },

    registerElements(elements) {
        this.elements = elements;
    },

    isDefined(element) {
        return element in this.definedElements;
    },

    showInTab(id, label, content, element = '') {
        if (element != '' && element in this.elements) {
            if (this.isDefined(element)) {
                console.log(`${element} already imported`);
            } else {
                import(this.elements[element])
                    .then(o => {
                        // console.log(o);
                        this.definedElements[element] = true;
                    })
                    .catch(e => {
                        console.error(e);
                    });
            }
        }

        const tab = document.querySelector('tab-container');
        if (tab) {
            tab.addTab(id, label, content);
        }
    }
};

export { App };

(function() {
    window.app = window.app ? window.app : App;
})();