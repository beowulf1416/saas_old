'use strict';
import { notify, showInView } from '/static/js/ui/ui.js';
import { Vendors } from '/static/js/modules/purchasing/vendors.js';
class VendorSelector extends HTMLElement {

    constructor() {
        const self = super();
        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/purchasing/vendor-selector/vendor-selector.css');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this._init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(div);

        this._attachEventHandlers = this._attachEventHandlers.bind(this);
        this._prefetch = this._prefetch.bind(this);
        this._setVendor = this._setVendor.bind(this);

        this._attachEventHandlers();
        this._prefetch();
    }

    static get observedAttributes() { 
        return ['vendor-id']; 
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const self = this;
        if (name == 'vendor-id') {
            const client_id = this.getAttribute('client-id');
            const vendor_id = newValue;
            Vendors.get(client_id, vendor_id).then((r) => {
                if (r.status == 'success') {
                    self._setVendor(r.json.vendor);
                } else {
                    notify(r.status, r.message);
                }
            });
        }
    }

    _init(container) {
        const address = this.hasAttribute('show-address') 
            ? `<textarea id="address" name="address" class="form-input-address" title="Vendor Address" plaeceholder="Vendor Address" readonly></textarea>` : '';

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
                const vendor_id = e.detail.vendor.id;
                self.setAttribute('vendor-id', vendor_id);
            });
        });
    }

    _prefetch() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');
        const vendor_id = this.getAttribute('vendor-id');
        if (vendor_id) {
            Vendors.get(client_id, vendor_id).then((r) => {
                if (r.status == 'success') {
                    const vendor = r.json.vendor;
                    self._setVendor(vendor);
                } else {
                    notify(r.status, r.message);
                }
            });
        }
    }

    _setVendor(vendor = {}) {
        const self = this;
        const shadow = this.shadowRoot;

        const input_display = shadow.getElementById('display');
        input_display.value = vendor.name;

        const input_address = shadow.getElementById('address');
        if (input_address) {
            input_address.value = vendor.address;
        }
    }
}
customElements.define('vendor-selector', VendorSelector);