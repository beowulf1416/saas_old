'use strict';
import { showInView } from '/static/js/ui/ui.js';
class WarehouseSelector extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/inventory/warehouse.selector/warehouse.selector.css');

        const google_web_fonts = document.createElement("link");
        google_web_fonts.setAttribute('rel', 'stylesheet');
        google_web_fonts.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this._init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(google_web_fonts);
        shadow.appendChild(div);

        this._attachEventHandlers = this._attachEventHandlers.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const client_id = this.getAttribute('client-id');

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <input type="hidden" id="client-id" name="client_id" value="${client_id}" />
            <input type="text" id="selector" name="selector" class="form-input-selector" readonly />
            <button id="btn-warehouse" type="button" class="btn" title="Select Warehouse">...</button>
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const shadow = this.shadowRoot;

        const client = shadow.getElementById('client-id');
        const client_id = client.value;

        const btnwarehouse = shadow.getElementById('btn-warehouse');
        btnwarehouse.addEventListener('click', function(e) {
            showInView('warehouse-selector', `<warehouse-selector-view client-id="${client_id}"></warehouse-selector-view>`);
        });
    }
}
customElements.define('warehouse-selector', WarehouseSelector);