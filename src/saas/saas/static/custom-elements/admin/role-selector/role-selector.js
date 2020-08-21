'use strict';
import { Roles } from '/static/js/modules/admin/roles.js';
import { notify } from '/static/js/ui/ui.js';

class RoleSelector extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/admin/role-selector/role-selector.css');

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

        this.setRoles = this.setRoles.bind(this);
        this._attachEventHandlers = this._attachEventHandlers.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const self = this;

        const div = document.createElement('div');
        div.innerHTML = `
            <div class="form-wrapper">
                <form class="form-role-selector">
                    <label for="search">Role</label>
                    <input type="search" id="search" name="search" class="form-input-search" title="Search Role" placeholder="Role" />
                    <button type="button" class="btn btn-search">
                        <span class="material-icons">search</span>
                    </button>
                </form>
            </div><!-- .form-wrapper -->
            <div class="table-wrapper">
                <table class="tbl-roles">
                    <caption>Roles</caption>
                    <colgroup>
                    </colgroup>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <a class="link-assign-role" title="Assign Roles" href="#">
                                    <span class="material-icons">assignment_return</span>
                                </a>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div><!-- .table-wrapper -->
        `;

        container.appendChild(div);
    }

    connectedCallback() {
        if (this.isConnected) {
            const self = this;
            const shadow = this.shadowRoot;
        }
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        const beginsearch = function(filter) {
            Roles.filter(client_id, filter).then((r) => {
                if (r.status == 'success') {
                    self.setRoles(r.json.roles);
                } else {
                    notify(r.status, r.message);
                }
            });
        };

        const filter = shadow.getElementById('search');
        filter.addEventListener('keyup', function(e) {
            if (e.keyCode == 13) {
                beginsearch(filter.value);
                e.preventDefault();
            }
        });

        const search = shadow.querySelector('button.btn-search');
        search.addEventListener('click', function(e) {
            beginsearch(filter.value);
        });

        const assign = shadow.querySelector('.link-assign-role');
        assign.addEventListener('click', function(e) {
            const selected = shadow.querySelectorAll('.form-input-selected:checked');
            const roleIds = [];
            selected.forEach((r) => {
                roleIds.push(r.value);
            });
            self.dispatchEvent(new CustomEvent('assign', {
                bubbles: true,
                cancelable: true,
                detail: {
                    roleIds: roleIds
                }
            }));
        });
    }

    setRoles(roles = []) {
        const self = this;
        const shadow = this.shadowRoot;

        const tbody = shadow.querySelector('table.tbl-roles tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        roles.forEach((r) => {
            const tds = [];
            tds.push(`<td><input type="checkbox" name="selected" class="form-input-selected" title="Select Role" value="${r.id}" /></td>`);
            tds.push(`<td>${r.name}</td>`);
            const tdall = tds.join('');

            const tr = document.createElement('tr');
            tr.innerHTML = `
                ${tdall}
            `;

            tbody.appendChild(tr);
        });
    }
}
customElements.define('role-selector', RoleSelector);
export { RoleSelector };