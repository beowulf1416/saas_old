'use strict';
import { showInTab, notify } from '/static/js/ui/ui.js';
import { Accounts } from '/static/js/modules/accounting/accounts.js';

class AccountTree extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/accounting/account.tree/account.tree.css');

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
        this.addAccounts = this.addAccounts.bind(this);
        this._getClientId = this._getClientId.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const self = this;

        const client_id = this.getAttribute('client-id');

        const account_types = ['asset', 'liability', 'equity', 'income', 'expense'];
        const tbody = [];
        account_types.forEach((type) => {
            tbody.push(`
            <tbody id="${type}">
                <tr class="header" role="row">
                    <td colspan="2" aria-level="1"><span>${type}</span></td>
                </tr>
            </tbody>
            `);
        });
        const tbodyall = tbody.join('');

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="form-wrapper">
                <form class="form-account-tree">
                    <input type="hidden" id="client-id" name="client_id" value="${client_id}" />
                </form>
            </div><!-- .form-wrapper -->
            <div class="toolbar" role="toolbar">
                <button type="button" class="btn btn-new" title="New Account">
                    <span class="material-icons">create_new_folder</span>
                </button>
            </div><!-- .toolbar -->
            <div class="table-wrapper">
                <table class="tbl-accounts" role="treegrid" aria-label="Chart of Accounts">
                    <caption>Chart of Accounts</caption>
                    <colgroup>
                        <col class="col-name">
                        <col class="col-amount">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    ${tbodyall}
                </table>
            </div><!-- .table-wrapper -->
        `;

        container.appendChild(div);

        Accounts.getTree(client_id).then((r) => {
            if (r.status == 'success') {
                const accounts = r.json.accounts;
                self.addAccounts(accounts);
            } else {
                notify(r.status, r.message);
            }
        });
    }

    _getClientId() {
        const shadow = this.shadowRoot;
        const client = shadow.getElementById('client-id');
        return client.value;
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this._getClientId();

        const btnnew = shadow.querySelector('button.btn-new');
        btnnew.addEventListener('click', function(e) {
            showInTab('accounting-account-editor', 'New Account', `<account-editor client-id="${client_id}"></account-editor>`);
            e.preventDefault();
        });
    }

    addAccounts(accounts = []) {
        const self = this;
        const shadow = this.shadowRoot;

        const account_types = ['asset', 'liability', 'equity', 'income', 'expense'];
        account_types.forEach((type) => {
            const tbody = shadow.querySelector(`table.tbl-accounts tbody#${type}`);
            const rows = shadow.querySelectorAll(`table.tbl-accounts tbody#${type} tr`);
            rows.forEach((tr) => {
                if (!tr.classList.contains('header')) {
                    tbody.removeChild(tr);
                }
            });
        });
    }
}
customElements.define('account-tree', AccountTree);
export { AccountTree };