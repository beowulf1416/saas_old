'use strict';

class TabContainer extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/tab.container/tab.container.css');

        const google_web_fonts = document.createElement("link");
        google_web_fonts.setAttribute('rel', 'stylesheet');
        google_web_fonts.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons');


        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this.init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(google_web_fonts);
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
                
                const parent_li = atab.parentElement;
                parent_li.classList.remove('active');
            }

            const ptab = shadow.querySelector('div.tab-panel.active');
            if (ptab != null) {
                ptab.classList.remove('active');
            }

            const selectedTab = shadow.querySelector(`a#link-${id}`);
            if (selectedTab != null) {
                selectedTab.setAttribute('aria-selected', true);

                const parent_li = selectedTab.parentElement;
                parent_li.classList.add('active');
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
            if (existingTab == null) {
                const tab = shadow.querySelector('.tabs [role=tablist] .tab-link[aria-selected=true]');
                if (tab != null) {
                    tab.setAttribute('aria-selected', 'false');

                    const parent_li = tab.parentElement;
                    parent_li.classList.remove('active');
                }

                const tp = shadow.querySelector('.tabs [role=tabpanel].active');
                if (tp != null) {
                    tp.classList.remove('active');
                }

                const li = document.createElement('li');
                li.classList.add('list-item', 'active');
                li.innerHTML = `
                    <a  id="link-${id}"
                        class="tab-link"
                        role="tab"
                        aria-selected="true"
                        aria-controls="tabpanel-${id}"
                        data-id="${id}"
                        href="#">
                        ${title}
                    </a>
                    <a id="close-${id}"
                        title="Close"
                        class="tab-link-close"
                        aria-controls="tabpanel-${id}"
                        href="#">
                        <span class="material-icons">close</span>
                    </a>
                `;

                const div = document.createElement('div');
                div.classList.add('tab-panel', 'active');
                div.setAttribute('role', 'tabpanel');
                div.setAttribute('id', `tabpanel-${id}`);
                div.setAttribute('data-id', id);
                div.innerHTML = `
                    <div class="content-wrapper">
                        ${content}
                    </div><!-- .content-wrapper -->
                `;

                ul.appendChild(li);
                tabs.appendChild(div);

                const a = li.querySelector('a.tab-link');
                a.addEventListener('click', function(e) {
                    e.preventDefault();

                    const tab = shadow.querySelector('.tabs [role=tablist] .tab-link[aria-selected=true]');
                    if (tab != null) {
                        tab.setAttribute('aria-selected', 'false');
                        tab.parentElement.classList.remove('active');
                    }

                    let tp = shadow.querySelector('.tabs [role=tabpanel].active');
                    if (tp != null) {
                        tp.classList.remove('active');
                    }

                    a.setAttribute('aria-selected', 'true');
                    a.parentElement.classList.add('active');
                    const aria_controls = a.getAttribute('aria-controls');
                    tp = shadow.getElementById(aria_controls);
                    tp.classList.add('active'); 
                });

                const close = li.querySelector('a.tab-link-close');
                close.addEventListener('click', function(e) {
                    e.preventDefault();

                    const tp_id = close.getAttribute('aria-controls');
                    const tp = shadow.getElementById(tp_id);

                    const li = close.parentElement;
                    
                    tabs.removeChild(tp);
                    ul.removeChild(li);

                    const tab = ul.querySelector('[role=tab]');
                    const tab_id = tab.dataset.id;
                    self.setActiveTab(tab_id);
                });
            } else {
                this.setActiveTab(id);
            }
        }
    }
}
customElements.define('tab-container', TabContainer);
export { TabContainer };