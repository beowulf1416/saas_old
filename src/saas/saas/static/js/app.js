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

    loadElement(element) {
        if (element != '' && element in this.elements) {
            if (this.isDefined(element)) {
                console.log(`${element} already imported`);
            } else {
                import(this.elements[element])
                    .then(o => {
                        this.definedElements[element] = true;
                    })
                    .catch(e => {
                        console.error(e);
                    });
            }
        }
    },

    showInTab(id, label, content, element = '') {
        this.loadElement(element);

        const tab = document.querySelector('tab-container');
        if (tab) {
            tab.addTab(id, label, content);
        }
    },

    showInView(label = '', content = '', element = '') {
        this.loadElement(element);
        
        const views = document.getElementById('views');
        if (views.firstChild) {
            views.removeChild(views.lastChild);
        }
    
        views.innerHTML = `
            <div class="view-wrapper">
                <div class="view-header">
                    <h4>${label}</h4>
                    <a class="link-close" title="Close View" href="#">
                        <span class="material-icons">close</span>
                    </a>
                </div><!-- .view-header -->
                <div class="view-content">
                    ${content}
                </div><!-- .view-content -->
            </div><!-- .view-wrapper -->
        `;
    
        // event handler
        const close = views.querySelector('.link-close');
        close.addEventListener('click', function(e) {
            while(views.firstChild) {
                views.removeChild(views.lastChild);
            }
            e.preventDefault();
        });
    
        return views.querySelector('.view-content');
    }
};

export { App };

(function() {
    window.app = window.app ? window.app : App;
})();