'use strict';
import { notify } from '/static/js/ui/ui.js';
import { Vendors } from '/static/js/modules/hr/vendors.js';
class VendorEditor extends HTMLElement {

    constructor() {
        const self = super();
        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/inventory/vendor-editor/vendor-editor.css');

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
        const vendor_id = this.hasAttribute('vendor-id') ? this.getAttribute('vendor-id') : uuidv4();

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button type="button" id="btn-save" class="btn btn-save" title="Save">
                    <span class="material-icons">save</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form id="form-vendor">
                    <input type="hidden" id="vendor-id" name="vendor_id" value="${vendor_id}" />

                    <!-- name -->
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" class="form-input-name" title="Name" placeholder="Name" />

                    <!-- address -->
                    <label for="address">Address</label>
                    <textarea id="address" name="address" class="form-input-address" title="Address" placeholder="Address"></textarea>

                    <!-- country -->
                    <label for="country">Country</label>
                    <select id="country" name="country" class="form-input-country" title="Select Country">
                    </select>
                </form>
            </div><!-- .form-wrapper -->
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        const btnsave = shadow.getElementById('btn-save');
        btnsave.addEventListener('click', function(e) {
            console.log('//TODO save');

            const vendor_id = self._getVendorId();

            const name = shadow.getElementById('name');
            const address = shadow.getElementById('address');
            const country = shadow.getElementById('country');
            Vendors.add(client_id, vendor_id, name.value, address.value, country.value).then((r) => {
                notify(r.status, r.message);
            });

        });
    }

    _getVendorId() {
        const self = this;
        const shadow = this.shadowRoot;

        const vendor = shadow.getElementById('vendor-id');
        return vendor.value;
    }
}
customElements.define('vendor-editor', VendorEditor);