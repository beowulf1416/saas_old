'use strict';
import { notify, showInTab } from '/static/js/ui/ui.js';
class FacilityBrowser extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/inventory/facility/facility-browser/facility-browser.css');

        const default_style = document.createElement("link");
        default_style.setAttribute('rel', 'stylesheet');
        default_style.setAttribute('href', '/static/css/default.css');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this._init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(default_style);
        shadow.appendChild(div);

        this._attachEventHandlers = this._attachEventHandlers.bind(this);
        this._attachEventHandlers();
    }

    _init(container) {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button type="button" id="btn-new-facility" class="btn btn-new" title="New Facility">
                    <span class="material-icons">home_work</span>
                </button>
            </div><!-- .toolbar -->
            <form-search id="search" title="Search for Facility" placeholder="Facility"></form-search>
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        const search = shadow.getElementById('search');
        search.addEventListener('search', function(e) {
            const filter = e.detail.filter;

            console.log(filter);
        });

        shadow.getElementById('btn-new-facility').addEventListener('click', function() {
            showInTab('inventory-facility', 'New Facility', `<facility-editor client-id="${client_id}"></facility-editor>`);
        });
    }
}
customElements.define('facility-browser', FacilityBrowser);