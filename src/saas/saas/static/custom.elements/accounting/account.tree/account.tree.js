'use strict';
import { showInTab } from '/static/js/ui/ui.js';

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
    }

    _init(container) {
        const client_id = this.getAttribute('client-id');

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
                    <span class="material-icons">crete_new_folder</span>
                </button>
            </div><!-- .toolbar -->
            <div class="table-wrapper">
            </div><!-- .table-wrapper -->
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const btnnew = shadow.querySelector('button.btn-new');
        btnnew.addEventListener('click', function(e) {
            showInTab('accounting-account-editor', 'New Account', `<account-editor client-id="${client_id}"></account-editor>`);
            e.preventDefault();
        });
    }

}
customElements.define('account-tree', AccountTree);
export { AccountTree };