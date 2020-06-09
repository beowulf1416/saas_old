'use strict';
import { notify } from '/static/js/ui/ui.js';
import { Clients } from '/static/js/helpers/clients/clients.js';

class ClientEditor extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/client.editor/client.editor.css');

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

        this._attachEventHandler = this._attachEventHandler.bind(this);

        this._attachEventHandler();
    }

    connectedCallback() {
        if (this.isConnected) {
            const self = this;
            const shadow = this.shadowRoot;

            const client_id = this.hasAttribute('client-id') ? this.getAttribute('client-id') : '';
            if (client_id != '') {
                Clients.get(client_id).then((r) => {
                    if (r.status == 'success') {
                        const client = r.json.client;
                        const name = shadow.getElementById('name');
                        name.value = client.name;

                        const address = shadow.getElementById('address');
                        address.value = client.address;
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
                    <button type="button" class="btn btn-save" title="Save">
                        <span class="material-icons">save</span>
                    </button>
                </div><!-- .toolbar -->
                <form class="form-client-editor">
                    <input type="hidden" id="client_id" name="client_id" value="${client_id}" />
                    <!-- name -->
                    <label for="name">Name</label>
                    <div class="form-group form-group-name">
                        <input type="text" id="name" name="name" class="form-input-name" title="Client Name" placeholder="Name" />
                    </div><!-- .form-group -->

                    <!-- address -->
                    <label for="address">Address</label>
                    <div class="form-group form-group-address">
                        <textarea id="address" name="address" class="form-input-address" title="Address" placeholder="Address">
                        </textarea>
                    </div><!-- .form-group -->
                </form>
            </div><!-- .form-wrapper -->
        `;

        container.appendChild(div)
    }

    _attachEventHandler() {
        const self = this;
        const shadow = this.shadowRoot;

        const btnsave = shadow.querySelector('button.btn-save');
        btnsave.addEventListener('click', function(e) {
            const client_id = shadow.getElementById('client_id');
            const name = shadow.getElementById('name');
            const address = shadow.getElementById('address');

            if (client_id.value == '') {
                Clients.add(name.value, address.value, '').then((r) => {
                    if (r.status == 'success') {
                        client_id.value = r.json.clientId;
                    } else {
                        notify(r.status, r.message);
                    }
                });
            } else {
                Clients.update(client_id.value, name.value, address.value).then((r) => {
                    notify(r.status, r.message);
                });
            }
        });
    }
}
customElements.define('client-editor', ClientEditor);
export { ClientEditor };