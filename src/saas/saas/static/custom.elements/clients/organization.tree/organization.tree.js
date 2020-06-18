'use strict';
import { notify, showInTab } from '/static/js/ui/ui.js';
import { ClientOrganizations } from '/static/js/modules/clients/organizations.js';
class OrganizationTree extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/clients/organization.tree/organization.tree.css');

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
        this._refresh = this._refresh.bind(this);
        
        this._attachEventHandlers();
    }

    _init(container) {
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button id="btn-new" type="button" class="btn btn-new" title="New Organization">
                    <span class="material-icons">account_tree</span>
                </button>
                <button id="btn-refresh" type="button" class="btn btn-refresh" title="Refresh">
                    <span class="material-icons">refresh</span>
                </button>
            </div><!-- .toolbar -->
            <div class="table-wrapper">
                <table class="tbl-org-tree" role="treegrid">
                    <caption>Organizational Tree</caption>
                    <colgroup>
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="name"></th>
                        </tr>
                    </thead>
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

        const btnnew = shadow.getElementById('btn-new');
        btnnew.addEventListener('click', function(e) {
            showInTab('organization-editor', 'New Organization', `<organization-editor client-id="${client_id}"></organization-editor>`);
        });

        const btnrefresh = shadow.getElementById('btn-refresh');
        btnrefresh.addEventListener('click', function(e) {
            self._refresh();
        });
    }

    setOrganizations(organizations = []) {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        const tbody = shadow.querySelector('table.tbl-org-tree');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        organizations.forEach((o) => {
            const tr = document.createElement('tr');
            tr.setAttribute('role', 'row');
            tr.setAttribute('aria-level', o.level);
            tr.setAttribute('aria-posinset', 1);
            tr.setAttribute('aria-setsize', 1);
            tr.setAttribute('aria-expanded', true);
            tr.setAttribute('draggable', true);
            tr.dataset.orgid = o.id;
            tr.innerHTML = `
                <td role="gridcell" data-level="${o.level}">
                    <span>${o.name}</span>
                </td>
            `;

            tbody.appendChild(tr);

            // event handlers
            tr.addEventListener('dragstart', function(e) {
                tr.classList.add('drag-start');
                e.dataTransfer.setData('text/plain', JSON.stringify({
                    id: tr.dataset.orgid
                }));
            });

            tr.addEventListener('dragenter', function(e) {
                tr.classList.add('drag-valid');
            });

            tr.addEventListener('dragexit', function(e) {
                tr.classList.remove('drag-valid');
            });

            tr.addEventListener('dragover', function(e) {
                e.preventDefault();

                const starttr = shadow.querySelector('.drag-start');
                starttr.classList.remove('drag-start');
            });

            tr.addEventListener('drop', function(e) {
                e.preventDefault();

                const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                const org_id = data.id;
                const parent_org_id = tr.dataset.orgid;
                ClientOrganizations.assignParentOrganization(
                    client_id,
                    org_id,
                    parent_org_id
                ).then((r) => {
                    notify(r.status, r.message);
                });
            });
        });
    }

    _refresh() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        ClientOrganizations.tree(client_id).then((r) => {
            if (r.status == 'success') {
                self.setOrganizations(r.json.organizations);
            } else {
                notify(r.status, r.message);
            }
        });
    }
}
customElements.define('organization-tree', OrganizationTree);