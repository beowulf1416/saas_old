'use strict';
import { Util } from '/static/js/util.js';
// ref: https://www.w3.org/TR/wai-aria-practices/examples/treegrid/treegrid-1.html

class AccountTree extends HTMLElement {

    constructor() {
        self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/css/account.tree.css');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this.init(self, div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(div);

        this.addAccounts = this.addAccounts.bind(this);
        // this.setAccountTypes = this.setAccountTypes.bind(this);
    }

    init(component, container) {
        const showAdd = this.hasAttribute('show-add');

        let add = '';
        if (showAdd) {
            add = '<a class="nav-link link-add-account" title="Add Account" href="#">&plus;</a>';
        }
        
        const ths = [];
        ths.push(`<th scope="col" class="column col-name">Name</th>`);
        ths.push(`<th scope="col" class="column col-description">Description</th>`);
        const thall = ths.join('');
        const col_count = ths.length;

        const account_types = ['asset', 'liability', 'equity', 'income', 'expense'];
        const tbodies = [];
        account_types.forEach(t => {
            tbodies.push(`
                <tbody id="${t}">
                    <tr class="tbody-header">
                        <td colspan="${col_count}" role="row" aria-level="1">${t}</td>
                    </tr>
                </tbody>
            `);
        });
        const tbodyall = tbodies.join('');

        const div = document.createElement('div');
        div.classList.add('table-wrapper');
        div.innerHTML = `
            <table class="tbl-accounts" role="treegrid" aria-label="Chart of Accounts">
                <caption>Chart of Accounts</caption>
                <colgroup>
                    <col id="colgrp1">
                    <col id="colgrp2">
                    <col id="colgrp3">
                </colgroup>
                <thead>
                    <tr>
                        ${thall}
                    </tr>
                </thead>
                ${tbodyall}
                <tfoot>
                    <tr>
                        <td>${add}</td>
                    </tr>
                </tfoot>
            </table>
        `
        container.appendChild(div);

        if (showAdd) {
            const ladd = container.querySelector('a.link-add-account');
            ladd.addEventListener('click', function(e) {
                self.dispatchEvent(new CustomEvent('onaddaccount', {
                    bubbles: true,
                    cancelable: true
                }));
            });
        }
    }

    addAccounts(accounts = [], parent = null) {
        const self = this;
        const shadow = this.shadowRoot;
        if (parent == null) {
            accounts.forEach(a => {
                let tbody = null;
                const type_id = a.type_id;
                switch(type_id) {
                    case 1: { // asset
                        tbody = shadow.querySelector('table.tbl-accounts tbody#asset');
                        break;
                    }
                    case 2: { // liabilities
                        tbody = shadow.querySelector('table.tbl-accounts tbody#liability');
                        break;
                    }
                    case 3: { // equity
                        tbody = shadow.querySelector('table.tbl-accounts tbody#equity');
                        break;
                    }
                    case 4: { // income
                        tbody = shadow.querySelector('table.tbl-accounts tbody#income');
                        break;
                    }
                    case 5: { // expense
                        tbody = shadow.querySelector('table.tbl-accounts tbody#expense');
                        break;
                    }
                    default: {
                        self.dispatchEvent(new CustomEvent('onerror', {
                            bubbles: true,
                            cancelable: true,
                            detail: {
                                message: `unknown account type: ${type_id}`
                            }
                        }));
                        break;
                    }
                }

                if (tbody != null) {
                    const tds = [];
                    tds.push(`<td role="gridcell" class="col col-name">${a.name}</td>`);
                    tds.push(`<td role="gridcell" class="col col-description">${a.description}</td>`);
                    const tdall = tds.join('');

                    const tr = document.createElement('tr');
                    tr.classList.add('row-account');
                    tr.setAttribute('role', 'row');
                    tr.setAttribute('aria-level', a.level);
                    tr.setAttribute('aria-posinset', 1);
                    tr.setAttribute('aria-setsize', 1);
                    tr.setAttribute('aria-expanded', true);
                    tr.innerHTML = `
                        ${tdall}
                    `;

                    tbody.appendChild(tr);
                }
            });
        } else {
            self.dispatchEvent(new CustomEvent('onerror', {
                bubbles: true,
                cancelable: true,
                detail: {
                    'message': '// todo working on this'
                }
            }));
        }
    }
}
customElements.define('account-tree', AccountTree);
export { AccountTree };