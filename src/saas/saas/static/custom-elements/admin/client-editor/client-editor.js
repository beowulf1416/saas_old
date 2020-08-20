'use strict';
import { notify } from '/static/js/ui/ui.js';
import { Clients } from '/static/js/modules/admin/clients.js';
import { Util } from '/static/js/util.js';
class ClientEditor extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/admin/client-editor/client-editor.css');

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

        this._attachEventHandler = this._attachEventHandler.bind(this);
        this._prefetch = this._prefetch.bind(this);

        this._attachEventHandler();
        this._prefetch();
    }

    connectedCallback() {
        if (this.isConnected) {
            const self = this;
            const shadow = this.shadowRoot;

            const client_id = this.getAttribute('client-id');
            if (client_id != null) {
                Clients.get(client_id).then((r) => {
                    if (r.status == 'success') {
                        const client = r.json.client;
                        const name = shadow.getElementById('name');
                        name.value = client.name;

                        const address = shadow.getElementById('address');
                        address.value = client.address;

                        shadow.getElementById('country').setAttribute('country-id', client.countryId);
                        shadow.getElementById('currency').setAttribute('currency-id', client.currencyId);
                    } else {
                        notify(r.status, r.message);
                    }
                });
            }
        }
    }

    _init(container) {
        const client_id = this.hasAttribute('client-id') ? this.getAttribute('client-id') : '';

        const div = document.createElement('div');
        div.innerHTML = `
            <div class="form-wrapper">
                <div class="toolbar" role="toolbar">
                    <button type="button" id="btn-save" class="btn btn-save" title="Save">
                        <span class="material-icons">save</span>
                    </button>
                </div><!-- .toolbar -->
                <form class="form-client-editor">
                    <input type="hidden" id="client_id" name="client_id" value="${client_id}" />
                    <!-- name -->
                    <label for="name">Name</label>
                    <div class="form-group form-group-name">
                        <input type="text" id="name" name="name" class="form-input form-input-name" title="Client Name" placeholder="Name" />
                    </div><!-- .form-group -->

                    <!-- address -->
                    <label for="address">Address</label>
                    <div class="form-group form-group-address">
                        <textarea id="address" name="address" class="form-input form-input-address" title="Address" placeholder="Address"></textarea>
                    </div><!-- .form-group -->

                    <!-- country -->
                    <label for="country">Country</label>
                    <country-selector id="country"></country-selector>

                    <!-- currency -->
                    <label for="currency">Currency</label>
                    <currency-selector id="currency"></currency-selector>
                </form>
            </div><!-- .form-wrapper -->
        `;

        container.appendChild(div)
    }

    _prefetch() {
        const self = this;
        const shadow = this.shadowRoot;
    }

    _attachEventHandler() {
        const self = this;
        const shadow = this.shadowRoot;

        const btnsave = shadow.querySelector('button.btn-save');
        btnsave.addEventListener('click', function(e) {
            const client_id = self.getAttribute('client-id');
            const name = shadow.getElementById('name');
            const address = shadow.getElementById('address');
            const country = shadow.getElementById('country');
            const currency = shadow.getElementById('currency');

            if (client_id == null) {
                const t_client_id = Util.generateUUID();
                Clients.add(t_client_id, name.value, address.value, country.value, currency.value).then((r) => {
                    notify(r.status, r.message, r.status == 'success' ? 3000 : 5000);
                });
            } else {
                Clients.update(client_id, name.value, address.value, country.value, currency.value).then((r) => {
                    notify(r.status, r.message, r.status == 'success' ? 3000 : 5000);
                });
            }
        });
    }
}
customElements.define('client-editor', ClientEditor);