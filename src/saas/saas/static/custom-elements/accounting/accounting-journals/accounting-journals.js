'use strict';
import { notify, showInTab } from '/static/js/ui/ui.js';
import { Transaction } from '/static/js/modules/accounting/transaction.js';
class AccountingJournals extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/accounting/accounting-journals/accounting-journals.css');

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
        this.setTransactions = this.setTransactions.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button type="button" id="btn-new" class="btn btn-new" title="New Journal Entry">
                    <span class="material-icons">post_add</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form id="form-journals" role="search">
                    <label for="filter">Find</label>
                    <input type="search" id="filter" name="filter" class="form-input-filter" title="Filter" placeholder="Find" />
                    <button type="button" id="btn-filter" class="btn btn-filter" title="Filter">
                        <span class="material-icons">search</span>
                    </button>
                </form>
            </div><!-- .form-wrapper -->
            <div class="table-wrapper">
                <table id="tbl-journals">
                    <caption>Accounting Journals</caption>
                    <colgroup>
                        <col class="edit">
                        <col class="description">
                        <col class="date">
                    </colgroup>
                    <thead>
                        <tr>
                            <td scope="col"></td>
                            <th scope="col">Description</th>
                            <th scope="col">Date</th>
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
            Transaction.filter(client_id, filter).then((r) => {
                if (r.status == 'success') {
                    self.setTransactions(r.json.transactions, filter);
                } else {
                    notify(r.status, r.message, 3000);
                }
            });
        };

        const input_filter = shadow.getElementById('filter');
        input_filter.addEventListener('keydown', function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();

                beginsearch(input_filter.value);
            }
        });

        const btnfilter = shadow.getElementById('btn-filter');
        btnfilter.addEventListener('click', function(e) {
            beginsearch(input_filter.value);
        });

        const btnnew = shadow.getElementById('btn-new');
        btnnew.addEventListener('click', function() {
            showInTab('accounting-journal', 'New Journal Entry', `<accounting-journal client-id="${client_id}"></accounting-journal>`);
        });
    }

    setTransactions(transactions = [], filter = '') {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        const tbody = shadow.querySelector('table#tbl-journals tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        transactions.forEach((t) => {
            const t_description = t.description.replace(filter, `<strong>${filter}</strong>`);

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <a title="Edit" class="link-edit-transaction" href="#" data-transactionid="${t.transaction_id}">
                        <span class="material-icons">edit</span>
                    </a>
                </td>
                <td>${t_description}</td>
                <td>${t.created}</td>
            `;

            tbody.appendChild(tr);

            // event handlers
            const linkedittran = tr.querySelector('.link-edit-transaction');
            linkedittran.addEventListener('click', function(e) {
                e.preventDefault();

                const transaction_id = linkedittran.dataset.transactionid;

                showInTab('accounting-journal', 'Edit Journal', `<accounting-journal client-id="${client_id}" transaction-id="${transaction_id}"></accounting-journal>`);
            });
        });
    }
}
customElements.define('accounting-journals', AccountingJournals);