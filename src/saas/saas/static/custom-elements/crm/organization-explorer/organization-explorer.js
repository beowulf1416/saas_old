'use strict';
import { notify, showInTab } from '/static/js/ui/ui.js';
import { Organizations } from '/static/js/modules/crm/organizations.js';
class OrganizationExplorer extends HTMLElement {

    constructor() {
        const self = super();
        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/crm/organization-explorer/organization-explorer.css');

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
        this.setOrganizations = this.setOrganizations.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button type="button" id="btn-new" class="btn btn-new" title="New Organization">
                    <span class="material-icons">business</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form id="form-filter">
                    <label for="filter">Organizations</label>
                    <input type="search" id="filter" name="filter" class="form-input-filter" title="Search for Organizations" placeholder="Search" />
                    <button type="button" id="btn-filter" class="btn btn-filter" title="Search">
                        <span class="material-icons">search</span>
                    </button>
                </form>
            </div><!-- .form-wrapper -->
            <div class="table-wrapper">
                <table id="tbl-orgs">
                    <caption>Organizations</caption>
                    <colgroup>
                        <col class="edit">
                        <col class="name">
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col"></th>
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
                    notify(r.status, r.message);
                }
            });
        };

        const filter = shadow.getElementById('filter');
        filter.addEventListener('keyup', function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();

                beginsearch(filter.value);
            }
        });

        const btnfilter = shadow.getElementById('btn-filter');
        btnfilter.addEventListener('click', function(e) {
            beginsearch(filter.value);
        });

        const btnnew = shadow.getElementById('btn-new');
        btnnew.addEventListener('click', function(e) {
            showInTab('crm-organization-editor', 'New Organization', `<crm-organization-editor client-id="${client_id}"></crm-organization-editor>`)
        });
    }

    setOrganizations(orgs = [], filter = '') {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        const tbody = shadow.querySelector('table#tbl-orgs tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        orgs.forEach((o) => {
            const tr = document.createElement('tr');
            const org_name = o.name.replace(filter, `<strong>${filter}</strong>`);
            tr.innerHTML = `
                <td><a class="link-edit" title="Edit" href="#" data-id="${o.id}"><span class="material-icons">edit</span></a></td>
                <td>${org_name}</td>
            `;

            tbody.appendChild(tr);

            // event handlers
            const edit = tr.querySelector('.link-edit');
            edit.addEventListener('click', function(e) {
                e.preventDefault();

                showInTab('crm-organization-editor', 'Edit Organization', `<crm-organization-editor client-id="${client_id}" org-id="${edit.dataset.id}"></crm-organization-editor>`);
            });
        });
    }
}
customElements.define('organization-explorer', OrganizationExplorer);