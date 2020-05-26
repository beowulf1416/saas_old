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
        const showAdd = this.hasAttribute('show-add');

        const add = '';
        if (showAdd) {
            add = '<a class="nav-link link-add-account" title="Add Account" href="#">&plus;</a>';
        }

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
            <div class="footer">
                ${add}
            </div><!-- .footer -->
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

        const body = shadow.querySelector('div.table-wrapper div.body');
        if (parent == null) {
            accounts.forEach(a => {
                const id = 'id' + Util.generateId();

                const tds = [];
                tds.push(`<div class="column col-name"><a class="nav-link link-select-account" title="Account ${a.name}" href="#" data-id="${a.id}">${a.name}</a></div>`);
                tds.push(`<div class="column col-description">${a.description}</div>`);
                const tdall = tds.join('');

                const wrapper = document.createElement('div');
                wrapper.classList.add('row-wrapper');
                wrapper.dataset.id = a.id;
                wrapper.innerHTML = `
                    <div id="${id}" class="row row-account" draggable="true" data-id="${a.id}" data-level="0">
                        ${tdall}
                    </div><!-- .row -->
                `;

                body.appendChild(wrapper);

                const aselect = shadow.querySelector('a.link-select-account');
                aselect.addEventListener('click', function(e) {
                    self.dispatchEvent(new CustomEvent('onselectaccount', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            accountId: aselect.dataset.id
                        }
                    }));
                });

                const tr = wrapper.querySelector('div.row-account');
                tr.addEventListener('dragstart', function(e) {
                    e.dataTransfer.setData('text/plain', e.target.id);
                    e.dataTransfer.effectAllowed = 'link';

                    e.currentTarget.style.opacity = 0.5;
                });

                wrapper.addEventListener('dragenter', function(e) {
                    console.log('ondragenter');
                    console.log(e);
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'link';
                });

                wrapper.addEventListener('dragover', function(e) {
                    console.log('ondragover');
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'link';
                });

                wrapper.addEventListener('drop', function(e) {
                    e.preventDefault();
                    const dragstartid = e.dataTransfer.getData('text/plain');
                    const start_tr = shadow.querySelector('div#' + dragstartid);
                    start_tr.style.opacity = 1.0;

                    self.dispatchEvent(new CustomEvent('onassignparentaccount', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            accountId: start_tr.dataset.id,
                            parentAccountId: wrapper.dataset.id
                        }
                    }));
                });
            });
        } else {
            console.log('working on this');
        }
    }
}
customElements.define('account-tree', AccountTree);
export { AccountTree };