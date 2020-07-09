'use strict';
import { Util } from '/static/js/util.js';
import { notify } from '/static/js/ui/ui.js';
import { Organizations } from '/static/js/modules/crm/organizations.js';
class OrganizationSelectorView extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/crm/organization-selector/organization-selector-view.css');

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
        this.setOrganizations = this.setOrganizations.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="form-wrapper">
                <form id="form-filter">
                    <label for="filter">Organization</label>
                    <input type="search" id="filter" name="filter" class="form-input-filter" title="Search for Organization" placeholder="Organization" />
                    <button type="button" id="btn-filter" class="btn btn-filter" title="Search">
                        <span class="material-icons">search</span>
                    </button>
                </form>
            </div><!-- .form-wrapper -->
            <div class="table-wrapper">
                <table id="tbl-organizations">
                    <caption>Organizations</caption>
                    <colgroup>
                        <col class="select">
                        <col class="name">
                    </colgroup>
                    <thead>
                        <tr>
                            <td scope="col"></td>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tfoot>
                    </tfoot>
                    <tbody>
                    </tbody>
                </table>
            </div><!-- .table-wrapper -->
        `;
        
        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        const beginsearch = function(filter) {
            Organizations.filter(client_id, filter).then((r) => {
                if (r.status == 'success') {
                    self.setOrganizations(r.json.organizations, filter);
                } else {
                    notify(r.status, r.message, 3000);
                }
            });
        };

        const filter = shadow.getElementById('filter');
        filter.addEventListener('keyup', function(e) {
            if (e.keyCode == 13) {}
            e.preventDefault();

            beginsearch(filter.value);
        });

        const btnfilter = shadow.getElementById('btn-filter');
        btnfilter.addEventListener('click', function(e) {
            beginsearch(filter.value);
        });
    }

    setOrganizations(orgs = [], filter = '') {
        const self = this;
        const shadow = this.shadowRoot;

        const tbody = shadow.querySelector('table#tbl-organizations tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        orgs.forEach((o) => {
            const id = 'id' + Util.generateId();
            const org_name = o.name.replace(filter, `<strong>${filter}</strong>`);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="radio" id="${id}" name="selected" class="form-input-selected" title="Select Organization" value="${o.id}" data-name="${o.name}" /></td>
                <td><label for="${id}">${org_name}</label></td>
            `;

            tbody.appendChild(tr);

            // event handlers
            const select = tr.querySelector('.form-input-selected');
            select.addEventListener('change', function(e) {
                e.preventDefault();

                self.dispatchEvent(new CustomEvent('change', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        organization: {
                            id: select.value,
                            name: select.dataset.name
                        }
                    }
                }));
            });
        });
    }
}
customElements.define('crm-organization-selector-view', OrganizationSelectorView);