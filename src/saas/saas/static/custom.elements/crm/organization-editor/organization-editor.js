'use strict';
import { notify } from '/static/js/ui/ui.js';
import { Common } from '/static/js/modules/common/common.js';
import { Clients } from '/static/js/modules/clients/clients.js';
import { Organizations } from '/static/js/modules/crm/organizations.js';
class OrganizationEditor extends HTMLElement {

    constructor() {
        const self = super();
        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/crm/organization-editor/organization-editor.css');

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
        this._prefetch = this._prefetch.bind(this);
        this._getOrganizationId = this._getOrganizationId.bind(this);
        this.setOrganization = this.setOrganization.bind(this);

        this._attachEventHandlers();
        this._prefetch();
    }

    _init(container) {
        const organization_id = this.hasAttribute('org-id') ? this.getAttribute('org-id') : uuidv4();

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button type="button" id="btn-save" class="btn btn-save" title="Save">
                    <span class="material-icons">save</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form id="form-organization">
                    <input type="hidden" id="org-id" name="org_id" value="${organization_id}" />

                    <!-- name -->
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" class="form-input-name" title="Name" placeholder="Name" />

                    <!-- address -->
                    <label for="address">Address</label>
                    <textarea id="address" name="address" class="form-input-address" title="Address" placeholder="Address"></textarea>

                    <!-- country -->
                    <label for="country">Country</label>
                    <select id="country" name="country" class="form-input-country" title="Country">
                    </select>
                </form>
            </div><!-- .form-wrapper -->
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = self.getAttribute('client-id');

        const btnsave = shadow.getElementById('btn-save');
        btnsave.addEventListener('click', function(e) {
            const org_id = self._getOrganizationId();
            
            const input_name = shadow.getElementById('name');
            const input_address = shadow.getElementById('address');
            const input_country = shadow.getElementById('country');

            Organizations.save(
                client_id, 
                org_id, 
                input_name.value, 
                input_address.value, 
                input_country.value).then((r) => {
                    notify(r.status, r.message);
                });
        });
    }

    _getOrganizationId() {
        const self = this;
        const shadow = this.shadowRoot;

        const input_org = shadow.getElementById('org-id');
        return input_org.value;
    }

    _prefetch() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');
        const is_new = !this.hasAttribute('org-id');

        Clients.get(client_id).then((r) => {
            if (r.status == 'success') {
                const client = r.json.client;
                const country_id = client.country_id;

                Common.countries().then((rr) => {
                    if (rr.status == 'success') {
                        const countries = rr.json.countries;
                        const options = [];
                        countries.forEach((c) => {
                            if (country_id == c.id && is_new) {
                                options.push(`<option value="${c.id}" selected>${c.name}</option>`);
                            } else {
                                options.push(`<option value="${c.id}">${c.name}</option>`);
                            }
                        });
                        const optionsall = options.join();
                        const select_countries = shadow.getElementById('country');
                        select_countries.innerHTML = optionsall;
                    } else {
                        notify(rr.status, rr.message);
                    }
                });
            } else {
                notify(r.status, r.message);
            }
        });

        if (!is_new) {
            const org_id = this.getAttribute('org-id');

            Organizations.get(client_id, org_id).then((r) => {
                if (r.status == 'success') {
                    self.setOrganization(r.json.organization)
                } else {
                    notify(r.status, r.message);
                }
            });
        }
    }

    setOrganization(org = {}) {
        const self = this;
        const shadow = this.shadowRoot;

        const input_name = shadow.getElementById('name');
        input_name.value = org.name;

        const input_address = shadow.getElementById('address');
        input_address.value = org.address;

        const input_country = shadow.getElementById('country');
        input_country.value = org.country_id;
    }
}
customElements.define('crm-organization-editor', OrganizationEditor);