'use strict';

class TabContainer extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/css/tab.container.css');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this.init(self, div);

        // const shadow = this.attachShadow({ mode: 'open' });
        // shadow.appendChild(style);
        // shadow.appendChild(div);
        this.appendChild(style);
        this.appendChild(div);

        this.addTab = this.addTab.bind(this);
    }

    connectedCallback() {
        if (this.isConnected) {

        }
    }

    init(component, container) {
        const self = this;
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="list-wrapper">
                <ul class="list-tabs" role="tablist">
                </ul>
            </div><!-- .list-wrapper -->
            <div class="content-wrapper">
            </div><!-- .content-wrapper -->
        `;

        container.appendChild(div);
    }

    addTab(label = '', content = '') {
        const self = this;
        // const shadow = this.shadowRoot;

        const ul = this.querySelector('ul.list-tabs');
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="#">${label}</a>
        `;
        ul.appendChild(li);

        const div = document.createElement('div');
        div.innerHTML = `
            ${content}
        `;
        const tcontent = this.querySelector('.content-wrapper');
        tcontent.appendChild(div);
    }
}
customElements.define('tab-container', TabContainer);
export { TabContainer };