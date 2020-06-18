'use strict';
import { notify } from '/static/js/ui/ui.js';
import { ClientOrganizations } from '/static/js/modules/clients/organizations.js';
class OrganizationEditor extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/clients/organization.editor/organization.editor.css');

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
        const org_id = this.hasAttribute('organization-id') ? this.getAttribute('organization-id') : '';

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
                    <input type="hidden" id="client-id" name="client_id" value="${client_id}" />
                    <input type="hidden" id="organization-id" name="organization_id" value="${org_id}" />

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
        const org_id = this.hasAttribute('organization-id') ? this.getAttribute('organization-id') : '';

        const btnsave = shadow.getElementById('btn-save');
        btnsave.addEventListener('click', function(e) {
            const name = shadow.getElementById('name');
            const description = shadow.getElementById('description');

            if (org_id == '') {
                ClientOrganizations.add(client_id, name.nodeValue, description.value).then((r) => {
                    notify(r.status, r.message);
                });
            } else {
                ClientOrganizations.update(client_id, org_id, name.value, description.value).then((r) => {
                    notify(r.status, r.message);
                });
            }
        });
    }
}
customElements.define('organization-editor', OrganizationEditor);