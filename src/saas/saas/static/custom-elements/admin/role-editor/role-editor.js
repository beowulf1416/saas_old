'use strict';
import { Roles } from '/static/js/modules/admin/roles.js';
import { notify } from '/static/js/ui/ui.js';

class RoleEditor extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/admin/role-editor/role-editor.css');

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
        this._attachEventHandlers();
    }

    _init(container) {
        const client_id = this.getAttribute('client-id');

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
                    <!-- client -->
                    <label for="client_name">Client</label>
                    <client-selector id="client" client-id="${client_id}"></client-selector>

                    <!-- role name -->
                    <label for="name">Role</label>
                    <input type="text" id="name" name="name" class="form-input-name" title="Role Name" placeholder="Role Name" />

                    <!-- description -->
                    <label for="description">Description</label>
                    <textarea id="description" name="description" title="Description" placeholder="Description"></textarea>
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
            const client_id = shadow.getElementById('client').value;
            const role_id = self.getAttribute('role-id');
            const name = shadow.querySelector('input#name').value;

            if (role_id == null) {
                const t_role_id = uuidv4();
                Roles.add(client_id, t_role_id, name).then((r) => {
                    notify(r.status, r.message, 3000);
                });
            } else {
                notify('warning', '// TODO');
            }
        });
    }
}
customElements.define('role-editor', RoleEditor);