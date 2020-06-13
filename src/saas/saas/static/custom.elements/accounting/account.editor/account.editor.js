'use strict';
import { notify } from '/static/js/ui/ui.js';
import { Accounts } from '/static/js/modules/accounting/accounts.js';

class AccountEditor extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/accounting/account.editor/account.editor.css');

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
    }

    _init(container) {
        const client_id = this.getAttribute("client-id");

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="form-wrapper">
                <form class="form-account-editor">
                    <input type="hidden" id="client-id" name="client_id" title="Name" placeholder="Name" value="${client_id}" />

                    <!-- type -->
                    <label for="type">Type</label>
                    <select id="type" name="type" class="form-input-select" title="Type">
                    </select>

                    <!-- name -->
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" class="form-input-text" />

                    <!-- description -->
                    <label for="description">Description</label>
                    <textarea id="description" name="description" class="form-input-textarea" title="Description"></textarea>
                </form>
            </div><!-- .form-wrapper -->
        `;

        container.add(div);

        Accounts.getAccountTypes().ten((r) => {
            if (r.status == 'success') {
                const types = r.json.types;
                const options = [];
                types.forEach((type) => {
                    options.push(`<option value="${type.id}">${type.name}</option>`);
                });
                const select = div.getElementById('type');
                select.innerHTML = options.join('');
            } else {
                notify(r.status, r.message);
            }
         });
    }
}
customElements.define('account-editor', AccountEditor);
export { AccountEditor };