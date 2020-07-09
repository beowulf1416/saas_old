'use strict';
import { Roles } from '/static/js/modules/admin/roles.js';
import { notify } from '/static/js/ui/ui.js';

class RoleEditor extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/admin/role-editor/role-editor.css');

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

        this._attachEventHandlers();
    }

    _init(container) {
        const client_id = this.getAttribute('client-id');
        const client_name = this.getAttribute('client-name');
        const role_id = this.getAttribute('role-id');

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="form-wrapper">
                <div class="toolbar" role="toolbar">
                    <button type="button" class="btn btn-save" title="Save">
                        <span class="material-icons">save</span>
                    </button>
                </div><!-- .toolbar -->
                <form class="form-role-editor">
                    <input type="hidden" id="client_id" name="client_id" value="${client_id}" />
                    <input type="hidden" id="role_id" name="role_id" value="${role_id}" />

                    <!-- client -->
                    <label for="client_name">Client</label>
                    <input type="text" id="client_name" name="client_name" class="form-input-client-name" title="Client Name" placeholder="Client name" readonly value="${client_name}" />

                    <!-- role name -->
                    <label for="name">Role</label>
                    <input type="text" id="name" name="name" class="form-input-name" title="Role Name" placeholder="Role Name" />

                    <!-- description -->
                    <label for="description">Description</label>
                    <textarea id="description" name="description" title="Description" placeholder="Description">
                    </textarea>
                </form>
            </div><!-- .form-wrapper -->
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const btnsave = shadow.querySelector('button.btn-save');
        btnsave.addEventListener('click', function(e) {
            const client_id = shadow.querySelector('input#client_id');
            const role_id = shadow.querySelector('input#role_id');
            const name = shadow.querySelector('input#name');

            Roles.add(client_id.value, name.value).then((r) => {
                notify(r.status, r.message);
            });
        });
    }
}
customElements.define('role-editor', RoleEditor);
export { RoleEditor };