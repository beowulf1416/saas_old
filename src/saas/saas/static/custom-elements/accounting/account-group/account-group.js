'use strict';
import { Groups } from '/static/js/modules/accounting/groups.js';
import { Accounts } from '/static/js/modules/accounting/accounts.js';
import { notify } from '/static/js/ui/ui.js';
class AccountGroup extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/accounting/account-group/account-group.css');

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
        this._fetch = this._fetch.bind(this);

        this._attachEventHandler();
        this._fetch();
    }

    _init(container) {
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button type="button" id="btn-save" class="btn btn-save" title="Save">
                    <span class="material-icons">save</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form id="form-account-group">
                    <!-- type -->
                    <label for="type">Type</label>
                    <select id="type" name="type" class="form-input-select" title="Type">
                    </select>

                    <!-- name -->
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" class="form-input-name" title="Name" placeholder="Name" />

                    <!-- description -->
                    <label for="description">Description</label>
                    <textarea id="description" name="description" title="Description" class="form-input-description"></textarea>
                </form>
            </div><!-- .form-wrapper -->
        `;

        container.appendChild(div);
    }

    _attachEventHandler() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');
        const group_id = this.getAttribute('group-id');

        const btnsave = shadow.getElementById('btn-save');
        btnsave.addEventListener('click', function() {
            const input_name = shadow.getElementById('name');
            const input_description = shadow.getElementById('description');
            const input_type = shadow.getElementById('type');

            if (group_id) {
                Groups.add(client_id, group_id, input_type.value, input_name.value, input_description.value).then((r) => {
                    notify(r.status, r.message, 3000);
                });
            } else {
                Groups.add(client_id, uuidv4(), input_type.value, input_name.value, input_description.value).then((r) => {
                    notify(r.status, r.message, 3000);
                });
            }
        });
    }

    _fetch() {
        const self = this;
        const shadow = this.shadowRoot;

        Accounts.getAccountTypes().then((r) => {
            if (r.status == 'success') {
                const account_types = r.json.types;
                const options = [];
                account_types.forEach((t) => {
                    options.push(`<option value="${t.id}">${t.name}</option>`)
                });
                const input_types = shadow.getElementById('type');
                input_types.innerHTML = options.join('');
            } else {
                notify(r.status, r.message);
            }
        });
    }
}
customElements.define('account-group', AccountGroup);