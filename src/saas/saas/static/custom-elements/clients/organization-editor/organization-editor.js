'use strict';
import { notify } from '/static/js/ui/ui.js';
import { ClientOrganizations } from '/static/js/modules/clients/organizations.js';
import { Util } from '/static/js/util.js';
class OrganizationEditor extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/clients/organization-editor/organization-editor.css');

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
            <div class="toolbar" role="toolbar">
                <button id="btn-save" type="button" class="btn btn-save" title="Save">
                    <span class="material-icons">save</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form class="form-organization">
                    <!-- name -->
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" class="form-input-name" title="Organization Name" placeholder="Name" />

                    <!-- description -->
                    <label for="description">Description</label>
                    <textarea id="description" name="description" class="form-input-description" title="Description" placeholder="Description"></textarea>
                </form>
            </div><!-- .form-wrapper -->
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        shadow.getElementById('btn-save')
            .addEventListener('click', function(e) {
            const name = shadow.getElementById('name');
            const description = shadow.getElementById('description');

            const org_id = this.getAttribute('organization-id');
            if (org_id == null) {
                const t_org_id = Util.generateUUID();
                ClientOrganizations.add(
                    client_id, 
                    t_org_id, 
                    name.value, 
                    description.value
                    ).then((r) => {
                    notify(r.status, r.message, 3000);
                });
            } else {
                ClientOrganizations.update(
                    client_id, 
                    org_id, 
                    name.value, 
                    description.value
                    ).then((r) => {
                    notify(r.status, r.message, 3000);
                });
            }
        });
    }
}
customElements.define('organization-editor', OrganizationEditor);