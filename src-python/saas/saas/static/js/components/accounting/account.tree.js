'use strict';

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
    }

    init(component, container) {
        const ths = [];
        ths.push(`<th class="col-name">Name</th>`);
        ths.push(`<th class="col-description">Description</th>`);
        const thall = ths.join('');

        const div = document.createElement('div');
        div.classList.add('table-wrapper');
        div.innerHTML = `
            <table class="tbl-accounts">
                <thead>
                    ${thall}
                </thead>
                <tbody>
                </tbody>
                <tfoot>
                </tfoot>
            </table><!-- .tbl-accounts -->
        `;

        container.appendChild(div);
    }

    addAccounts(accounts = [], parent = null) {
        const self = this;
        const shadow = this.shadowRoot;
        const tbody = shadow.querySelector('table.tbl-accounts tbody');
        if (parent == null) {
            accounts.forEach(a => {
                const acct_id = a.id;
                const tds = [];
                tds.push(`<td class="col-name"><a class="nav-link link-account" title="${a.name}" href="#" data-id="${a.id}">${a.name}</a></td>`);
                tds.push(`<td class="col-description">${a.description}</td>`);
                const tdsall = tds.join('');

                const tr = document.createElement('tr');
                tr.classList.add('row-item', 'row-account', `row-account-${acct_id}`);
                tr.innerHTML = `${tdsall}`;

                tbody.appendChild(tr);

                const aname = tr.querySelector('a.link-account');
                aname.addEventListener('click', function(e) {
                    self.dispatchEvent(new CustomEvent('onselectaccount', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            accountId: aname.dataset.id
                        }
                    }));
                });
            });
        } else {
            const tracct = tbody.querySelector(`tr.row-account-${parent}`);
            if (tracct == null) {
                self.dispatchEvent(new CustomEvent('onerror', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        message: 'Unable to find parent account'
                    }
                }));
            } else {
                const colspan = tracct.children.length;

                const trs = [];
                accounts.forEach(a => {
                    const tds = [];
                    tds.push(`<td class="col-name">${a.name}</td>`);
                    tds.push(`<td class="col-description">${a.description}</td>`);
                    const tdsall = tds.join('');

                    trs.push(`<tr class="row-item row-account row-account-${a.id}">${tdsall}</tr>`);
                });
                const trall = trs.join('');

                const tr = document.createElement('tr');
                tr.classList.add('row-account-children');
                tr.innerHTML = `
                    <td colspan="${colspan}">
                        <table class="tbl-child-accounts">
                            <tbody>
                                ${trall}
                            </tbody>
                        </table>
                    </td>
                `;

                tracct.insertAdjacentElement('afterend', tr);
            }
        }
    }
}
customElements.define('account-tree', AccountTree);
export { AccountTree };