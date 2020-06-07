'use strict';

class TabContainer extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/tab.container/tab.container.css');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this.init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(div);

        this.setActiveTab = this.setActiveTab.bind(this);
        this.addTab = this.addTab.bind(this);
    }

    init(container) {
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="tabs">
                <ul class="tab-list" role="tablist">
                </ul>
            </div>
        `;

        container.appendChild(div);
    }

    setActiveTab(id = '') {
        if (id != '') {
            const self = this;
            const shadow = this.shadowRoot;

            const atab = shadow.querySelector('a[role=tab][aria-selected=true]');
            if (atab != null) {
                atab.setAttribute('aria-selected', 'false');
            }

            const ptab = shadow.querySelector('div.tab-panel.active');
            if (ptab != null) {
                ptab.classList.remove('active');
            }

            const selectedTab = shadow.querySelector(`a#link-${id}`);
            if (selectedTab != null) {
                selectedTab.setAttribute('aria-selected', true);
            }

            const selectedPanel = shadow.getElementById(`tabpanel-${id}`);
            if (selectedPanel != null) {
                selectedPanel.classList.add('active');
            }
        }
    }

    addTab(id = '', title = '', content = '') {
        if (id != '' && title != '' && content != "") {
            const self = this;
            const shadow = this.shadowRoot;

            const tabs = shadow.querySelector('.tabs');
            const ul = shadow.querySelector('[role=tablist]')

            // check if tab already exists
            const existingTab = shadow.getElementById(`link-${id}`);
            console.log(existingTab);
            if (existingTab == null) {
                const li = document.createElement('li');
                li.classList.add('list-item');
                li.innerHTML = `
                    <a  id="link-${id}"
                        class="tab-link"
                        role="tab"
                        aria-selected="true"
                        aria-controls="tabpanel-${id}"
                        href="#">
                        ${title}
                    </a>
                `;

                const div = document.createElement('div');
                div.classList.add('tab-panel', 'active');
                div.setAttribute('role', 'tabpanel');
                div.setAttribute('id', `tabpanel-${id}`);
                div.innerHTML = `
                    <div class="content-wrapper">
                        ${content}
                    </div><!-- .content-wrapper -->
                `;

                const tab = shadow.querySelector('.tabs [role=tablist] .tab-link[aria-selected=true]');
                if (tab != null) {
                    tab.setAttribute['aria-selected', 'false'];
                }

                const tp = shadow.querySelector('.tabs [role=tabpanel].active');
                if (tp != null) {
                    tp.classList.remove('active');
                }

                ul.appendChild(li);
                tabs.appendChild(div);

                const a = li.querySelector('a');
                a.addEventListener('click', function(e) {
                    const tab = shadow.querySelector('.tabs [role=tablist] .tab-link[aria-selected=true]');
                    if (tab != null) {
                        tab.setAttribute('aria-selected', 'false');
                    }

                    let tp = shadow.querySelector('.tabs [role=tabpanel].active');
                    if (tp != null) {
                        tp.classList.remove('active');
                    }

                    a.setAttribute('aria-selected', 'true');
                    const aria_controls = a.getAttribute('aria-controls');
                    tp = shadow.getElementById(aria_controls);
                    tp.classList.add('active'); 
                });
            } else {
                this.setActiveTab(id);
            }
        }
    }
}
customElements.define('tab-container', TabContainer);
export { TabContainer };