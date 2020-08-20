'use strict';
import { notify, showInView } from '/static/js/ui/ui.js';
import { Accounts } from '/static/js/modules/accounting/accounts.js';
class AccountSelector extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/accounting/account-selector/account-selector.css');

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
        this.value = this.value.bind(this);
        this._fetch = this._fetch.bind(this);

        this._attachEventHandlers();
        this._fetch();
    }

    _init(container) {
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <input type="text" id="display" name="display" class="form-input-display" title="Select Account" placeholder="Account" readonly />
            <button type="button" id="btn-select" class="btn btn-select" title="Select">&hellip;</button>
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        const input_display = shadow.getElementById('display');

        const btnselect = shadow.getElementById('btn-select');
        btnselect.addEventListener('click', function() {
            const selector = showInView('Select Account', `<account-selector-view client-id="${client_id}"></account-selector-view>`);
            selector.addEventListener('selected', function(e) {
                const account = e.detail.account;

                input_display.value = account.name;
                self.setAttribute('account-id', account.id);
            });
        });
    }

    get value() {
        return this.getAttribute('account-id');
    }

    _fetch() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');
        const account_id = this.getAttribute('account-id');
        if (account_id) {
            const input_display = shadow.getElementById('display');

            Accounts.get(client_id, account_id).then((r) => {
                if (r.status == 'success') {
                    const account = r.json.account;
                    input_display.value = account.name;
                } else {
                    notify(r.status, r.message);
                }
            });
        }
    }
}
customElements.define('account-selector', AccountSelector);