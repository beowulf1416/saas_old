'use strict';
import { showInTab, notify } from '/static/js/ui/ui.js';
import { Accounts } from '/static/js/modules/accounting/accounts.js';
import { Util } from '/static/js/util.js';
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
        this._refresh = this._refresh.bind(this);

        this._attachEventHandlers();
        this._refresh();
    }

    _init(container) {
        const self = this;

        const client_id = this.getAttribute('client-id');

        const account_types = ['asset', 'liability', 'equity', 'income', 'expense'];
        const tbody = [];
        account_types.forEach((type) => {
            tbody.push(`
            <tbody id="${type}">
                <tr class="header" role="row" aria-level="1" tab-index="-1">
                    <th scope="row" colspan="2" aria-level="1"><span>${type}</span></th>
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
                <button type="button" class="btn btn-refresh" title="Refresh">
                    <span class="material-icons">refresh</span>
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
                            <th scope="col">Name</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    ${tbodyall}
                </table>
            </div><!-- .table-wrapper -->
        `;

        container.appendChild(div);
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

        const btnrefresh = shadow.querySelector('button.btn-refresh');
        btnrefresh.addEventListener('click', function(e) {
            self._refresh();
            e.preventDefault();
        });
    }

    _refresh() {
        const self = this;
        const client_id = this._getClientId();

        Accounts.getTree(client_id).then((r) => {
            if (r.status == 'success') {
                const accounts = r.json.accounts;
                self.addAccounts(accounts);
            } else {
                notify(r.status, r.message);
            }
        });
    }

    addAccounts(accounts = []) {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this._getClientId();

        const tbodys = [];
        const account_types = ['asset', 'liability', 'equity', 'income', 'expense'];
        account_types.forEach((type) => {
            const tbody = shadow.querySelector(`table.tbl-accounts tbody#${type}`);
            const rows = shadow.querySelectorAll(`table.tbl-accounts tbody#${type} tr`);
            rows.forEach((tr) => {
                if (!tr.classList.contains('header')) {
                    tbody.removeChild(tr);
                }
            });

            tbodys.push(tbody);
        });

        accounts.forEach((account) => {
            const id = Util.generateId();

            const tr = document.createElement('tr');
            tr.setAttribute('tabindex', -1);
            tr.setAttribute('role', 'row');
            tr.setAttribute('aria-level', account.level - 1);
            tr.setAttribute('aria-posinset', 1);
            tr.setAttribute('aria-setsize', 1);
            tr.setAttribute('aria-expanded', true);
            tr.setAttribute('draggable', true);

            tr.id = `id${id}`;
            tr.dataset.typeid = account.type_id;
            tr.dataset.acctid = account.id;

            tr.innerHTML = `
                <td>
                    <span>${account.name}</span>
                </td>
                <td></td>
            `;

            const tbody = tbodys[account.type_id - 1];
            tbody.appendChild(tr);

            // event handlers
            tr.addEventListener('dragstart', function(e) {
                e.dataTransfer.setData('text/plain', JSON.stringify({
                    id: tr.id,
                    typeid: tr.dataset.typeid
                }));
                tr.classList.add('drag-start');
            });

            tr.addEventListener('dragenter', function(e) {
                const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                if (data.typeid == tr.dataset.typeid) {
                    tr.classList.add('drag-valid');
                } else {
                    tr.classList.add('drag-invalid');
                }
            });

            tr.addEventListener('dragexit', function(e) {
                tr.classList.remove('drag-valid', 'drag-invalid');
            });

            tr.addEventListener('dragover', function(e) {
                e.preventDefault();

                const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                const tr = shadow.getElementById(data.id);
                tr.classList.remove('drag-start');
            });

            tr.addEventListener('drop', function(e) {
                e.preventDefault();

                const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                if (data.typeid == tr.dataset.typeid) {
                    const tr_start = shadow.getElementById(data.id);

                    const parentAcctId = tr.dataset.acctid;
                    const acctId = tr_start.dataset.acctid;
                    Accounts.assignParent(client_id, acctId, parentAcctId).then((r) => {
                        if (r.status == 'success') {
                            self._refresh();
                        } else {
                            notify(r.status, r.message);
                        }
                    });
                } else {
                    console.log('ignore invalid drop target');
                }
            });
        });
    }
}
customElements.define('account-tree', AccountTree);
export { AccountTree };