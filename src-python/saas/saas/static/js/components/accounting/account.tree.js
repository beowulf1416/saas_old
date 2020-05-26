'use strict';
import { Util } from '/static/js/util.js';

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
        ths.push(`<div class="column col-name">Name</div>`);
        ths.push(`<div class="column col-description">Description</div>`);
        const thall = ths.join('');

        const div = document.createElement('div');
        div.classList.add('table-wrapper');
        div.innerHTML = `
            <div class="header">
                <div class="row">
                    ${thall}
                </div><!-- .row -->
            </div><!-- .header -->
            <div class="body">
            </div><!-- .body -->
        `
        container.appendChild(div);
    }

    addAccounts(accounts = [], parent = null) {
        const self = this;
        const shadow = this.shadowRoot;

        const body = shadow.querySelector('div.table-wrapper div.body');
        if (parent == null) {
            accounts.forEach(a => {
                const id = Util.generateId();

                const tds = [];
                tds.push(`<div class="column col-name">${a.name}</div>`);
                tds.push(`<div class="column col-description">${a.description}</div>`);
                const tdall = tds.join('');

                const tr = document.createElement('div');
                tr.classList.add('row', 'row-account');
                tr.setAttribute('id', `row${id}`);
                tr.setAttribute('draggable', true);
                tr.dataset.id = a.id;
                tr.dataset.level = 0;
                tr.innerHTML = `${tdall}`;

                body.appendChild(tr);

                tr.addEventListener('dragstart', function(e) {
                    console.log('dragstart');
                    console.log(e);
                    e.dataTransfer.setData('text/plain', e.target.id);
                    e.dataTransfer.dropEffect = 'link';

                    e.currentTarget.style.backgroundColor = 'yellow';
                });

                tr.addEventListener('ondragenter', function(e) {
                    console.log('ondragenter');
                    console.log(e);
                    e.preventDefault();
                    // e.dataTransfer.dropEffect = 'link';
                });

                tr.addEventListener('ondragover', function(e) {
                    console.log('ondragover');
                    console.log(e);
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'link';
                });

                tr.addEventListener('ondrop', function(e) {
                    console.log('ondrop');
                    console.log(e);
                    e.preventDefault();
                });
            });
        } else {
            console.log('working on this');
        }
    }
}
customElements.define('account-tree', AccountTree);
export { AccountTree };