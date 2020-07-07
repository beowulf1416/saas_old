'use strict';
import { notify, showInView } from '/static/js/ui/ui.js';
class VendorSelector extends HTMLElement {

    constructor() {
        const self = super();
        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/purchasing/vendor-selector/vendor-selector.css');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this._init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(div);

        this._attachEventHandlers = this._attachEventHandlers.bind(this);
        
        this._attachEventHandlers();
    }

    _init(container) {
        const address = this.hasAttribute('show-address') 
            ? `<textarea id="address" name="address" class="form-input-address" title="Vendor Address" readonly></textarea>` : '';

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <input type="text" id="display" name="display" class="form-input-display" title="Vendor" placeholder="Vendor" readonly />
            <button type="button" id="btn-select" class="btn btn-select" title="Select Vendor">&hellip;</button>
            ${address}
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        const btnselect = shadow.getElementById('btn-select');
        btnselect.addEventListener('click', function(e) {
            const selector = showInView('Select Vendor', `<vendor-selector-view client-id="${client_id}"></vendor-selector-view>`);
            selector.addEventListener('change', function(e) {
                console.log(e);
            });
        });
    }
}
customElements.define('vendor-selector', VendorSelector);