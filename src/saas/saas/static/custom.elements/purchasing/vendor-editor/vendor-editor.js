'use strict';
import { notify } from '/static/js/ui/ui.js';
import { Vendors } from '/static/js/modules/purchasing/vendors.js';
import { Common } from '/static/js/modules/common/common.js';
import { Clients } from '/static/js/modules/clients/clients.js';
class VendorEditor extends HTMLElement {

    constructor() {
        const self = super();
        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/purchasing/vendor-editor/vendor-editor.css');

        const style_default = document.createElement("link");
        style_default.setAttribute('rel', 'stylesheet');
        style_default.setAttribute('href', '/static/css/default.css');

        const google_web_fonts = document.createElement("link");
        google_web_fonts.setAttribute('rel', 'stylesheet');
        google_web_fonts.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this._init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(style_default);
        shadow.appendChild(google_web_fonts);
        shadow.appendChild(div);

        this._attachEventHandlers = this._attachEventHandlers.bind(this);
        this._prefetch = this._prefetch.bind(this);

        this._attachEventHandlers();
        this._prefetch();
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
                <div class="group">
                    <button type="button" id="btn-new-contact" class="btn btn-add-contact" title="Add New Contact">
                        <span class="material-icons">person_add</span>
                    </button>
                </div><!-- .group -->
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
            const vendor_id = self._getVendorId();

            const name = shadow.getElementById('name');
            const address = shadow.getElementById('address');
            const country = shadow.getElementById('country');
            Vendors.add(client_id, vendor_id, name.value, address.value, country.value).then((r) => {
                notify(r.status, r.message);
            });

        });

        const btnaddcontact = shadow.getElementById('btn-new-contact');
        btnaddcontact.addEventListener('click', function(e) {
            const vendor_id = self._getVendorId();

            console.log('//TODO');
        });
    }

    _getVendorId() {
        const self = this;
        const shadow = this.shadowRoot;

        const vendor = shadow.getElementById('vendor-id');
        return vendor.value;
    }

    _prefetch() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');
        const is_new = !this.hasAttribute('vendor-id');

        Clients.get(client_id).then((r) => {
            if (r.status == 'success') {
                const client = r.json.client;
                const country_id = client.country_id;

                Common.countries().then((r) => {
                    if (r.status == 'success') {
                        const countries = r.json.countries;
                        const options = [];
                        countries.forEach((c) => {
                            if (country_id == c.id && is_new) {
                                options.push(`<option value="${c.id}" selected>${c.name}</option>`);
                            } else {
                                options.push(`<option value="${c.id}">${c.name}</option>`);
                            }
                        });
                        const optionsall = options.join();
                        const select = shadow.getElementById('country');
                        select.innerHTML = optionsall;
                    } else {
                        notify(r.status, r.message);
                    }
                });
            } else {
                notify(r.status, r.message);
            }
        });

        if (!is_new) {
            const vendor_id = this.getAttribute('vendor-id');

            Vendors.get(client_id, vendor_id).then((r) => {
                if (r.status == 'success') {
                    const vendor = r.json.vendor;

                    const name = shadow.getElementById('name');
                    name.value = vendor.name;

                    const address = shadow.getElementById('address');
                    address.value = vendor.address;

                    const country = shadow.getElementById('country');
                    country.value = vendor.country_id;
                } else {
                    notify(r.status, r.message);
                }
            });
        }
    }
}
customElements.define('vendor-editor', VendorEditor);