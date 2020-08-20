'use strict';
import { Accounts } from '/static/js/modules/accounting/accounts.js';
import { notify } from '/static/js/ui/ui.js';
import { Util } from '/static/js/util.js';
class AccountSelectorView extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/accounting/account-selector/account-selector-view.css');

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
        this.setAccounts = this.setAccounts.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="form-wrapper">
                <form id="form-filter" role="search">
                    <!-- filter -->
                    <label for="filter">Account</label>
                    <input type="search" id="filter" name="filter" class="form-input-filter" title="Find Account" placeholder="Account" aria-label="Search for Account" />
                    <button type="button" id="btn-filter" class="btn btn-filter" title="Search">
                        <span class="material-icons">search</span>
                    </button>
                </form>
            </div><!-- .form-wrapper -->
            <div class="table-wrapper">
                <table id="tbl-accounts">
                    <caption>Accounts</caption>
                    <colgroup>
                        <col class="select">
                        <col class="name">
                    </colgroup>
                    <thead>
                        <tr>
                            <td scope="col"></td>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div><!-- .table-wrapper -->
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        const beginsearch = function(filter) {
            Accounts.filter(client_id, filter).then((r) => {
                if (r.status == 'success') {
                    self.setAccounts(r.json.accounts, filter);
                } else {
                    notify(r.status, r.message);
                }
            });
        };

        const filter = shadow.getElementById('filter');
        filter.addEventListener('keydown', function(e) {
            console.log(e.keyCode);
            if (e.keyCode == 13) {
                e.preventDefault();

                beginsearch(filter.value);
            }
        });

        const btnfilter = shadow.getElementById('btn-filter');
        btnfilter.addEventListener('click', function() {
            beginsearch(filter.value);
        });

        // shadow.getElementById('form-filter').addEventListener('submit', function(e) {
        //     console.log('submit');
        //     e.preventDefault();
        // });
    }

    setAccounts(accounts = [], filter = '') {
        const self = this;
        const shadow = this.shadowRoot;

        const tbody = shadow.querySelector('table#tbl-accounts tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        accounts.forEach((a) => {
            const id = 'id' + Util.generateId();
            const account_name = a.name.replace(filter, `<strong>${filter}</strong>`);

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="radio" id="${id}" name="selected" class="form-input-selected" title="Select Account" value="${a.id}" data-name="${a.name}" /></td>
                <td><label for="${id}">${account_name}</label></td>
            `;

            tbody.appendChild(tr);

            // event handlers
            const selected = tr.querySelector('.form-input-selected');
            selected.addEventListener('change', function() {
                self.dispatchEvent(new CustomEvent('selected', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        account: {
                            id: selected.value,
                            name: selected.dataset.name
                        }
                    }
                }));
            });
        });
    }
}
customElements.define('account-selector-view', AccountSelectorView);