'use strict';
import { showInView } from '/static/js/ui/ui.js';
import { Organizations } from '/static/js/modules/crm/organizations.js';
class OrganizationSelector extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/crm/organization-selector/organization-selector.css');

        const common = document.createElement("link");
        common.setAttribute('rel', 'stylesheet');
        common.setAttribute('href', '/static/css/default.css');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this._init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(common);
        shadow.appendChild(div);

        this._attachEventHandlers = this._attachEventHandlers.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const show_address = this.hasAttribute('show-address');

        const address = show_address ? '<textarea id="address" name="address" title="Address"></textarea>' : '';

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <input type="text" id="display" name="display" title="Organization" placeholder="Organization" readonly />
            <button type="button" id="btn-select" class="btn btn btn-select" title="Select Organization">&hellip;</button>
            ${address}
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        const display = shadow.getElementById('display');

        const select = shadow.getElementById('btn-select');
        select.addEventListener('click', function(e) {
            const selector = showInView('Select Organization', `<crm-organization-selector-view client-id="${client_id}"></crm-organization-selector-view>`);
            selector.addEventListener('change', function(e) {
                const org = e.detail.organization;

                display.value = org.name;
                self._org_id = org.id;

                Organizations.get(client_id, org.id).then((r) => {
                    if (r.status == 'success') {
                        const input_address = shadow.getElementById('address');
                        if (input_address) {
                            const org_full = r.json.organization;
                            input_address.value = org_full.address;
                        }
                    } else {
                        notify(r.status, r.message);
                    }
                });
            });
        });
    }
}
customElements.define('crm-organization-selector', OrganizationSelector);