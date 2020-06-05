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

        this.appendChild(style);
        this.appendChild(div);

        this.addTab = this.addTab.bind(this);
        this.setActiveTab = this.setActiveTab.bind(this);
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

    addTab(id = '', label = '', content = '') {
        const self = this;

        const ul = this.querySelector('ul.list-tabs');
        const li = document.createElement('li');
        li.innerHTML = `
            <a id="link-${id}" class="link-tab active" href="#" data-id="${id}">${label}</a>
        `;
        ul.appendChild(li);

        const div = document.createElement('div');
        div.setAttribute('id', `content-${id}`);
        div.classList.add('tab-content', 'active');
        div.innerHTML = `
            ${content}
        `;
        const tcontent = this.querySelector('.content-wrapper');
        tcontent.appendChild(div);

        const a = li.querySelector('a');
        a.addEventListener('click', function(e) {
            const id = a.dataset.id;
            this.setActiveTab(id);
        });
    }

    setActiveTab(id = '') {
        const self = this;
        const active = this.querySelector('a.link-tab.active');
        active.classList.remove('active');

        const selected = this.querySelector(`a#link-${id}`);
        selected.classList.add('active');

        const cactive = this.querySelector('div.tab-content.active');
        cactive.classList.remove('active');

        const cselected = this.querySelector(`div#content-${id}.tab-content`);
        cselected.classList.add('active');
    }
}
customElements.define('tab-container', TabContainer);
export { TabContainer };