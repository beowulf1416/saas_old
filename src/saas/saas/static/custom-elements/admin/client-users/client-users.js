'use strict';
import { showInTab, showInView, notify } from '/static/js/ui/ui.js';
import { Users } from '/static/js/modules/admin/users.js';
import { Clients } from '/static/js/modules/admin/clients.js';

class ClientUsers extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/admin/client-users/client-users.css');

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
        this._refreshUsers = this._refreshUsers.bind(this);
        this.setUsers = this.setUsers.bind(this);
        this._refreshRoles = this._refreshRoles.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const self = this;
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button type="button" class="btn btn-refresh" title="Refresh">
                    <span class="material-icons">refresh</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form class="form-client-user">
                    <!-- client -->
                    <label for="client">Client</label>
                    <client-selector id="client"></client-selector>
                </form>
            </div><!-- .form-wrapper -->
            <div class="table-wrapper">
                <table class="tbl-users">
                    <caption>Users</caption>
                    <colgroup>
                    </colgroup>
                    <thead>
                        <th></th>
                        <th></th>
                        <th>Active</th>
                        <th>Name</th>
                        <th>Email</th>
                    </thead>
                    <tbody>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><a title="Add User" class="link-user-add" href="#">&plus;</a></td>
                        </tr>
                    </tfoot>
                </table>
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
                            <td><a title="Add Role" class="link-role-add" href="#">&plus;</a></td>
                        </tr>
                    </tfoot>
                </table>
            </div><!-- .table-wrapper -->
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const input_client = shadow.getElementById('client');
        input_client.addEventListener('change', function(e) {
            self._refreshUsers(input_client.value);
        });

        const adduser = shadow.querySelector('.link-user-add');
        adduser.addEventListener('click', function(e) {
            const client_id = input_client.value;
            const selector = showInView('Select Users', `<user-selector client-id="${client_id}"></user-selector>`);
            selector.addEventListener('assign', function(e) {
                const userIds = e.detail.userIds;
                Users.addUsersToClient(client_id, userIds).then((r) => {
                    if (r.status == 'success') {
                        self._refreshUsers(client_id);
                    } else {
                        notify(r.status, r.message);
                    }
                });
                e.preventDefault();
            });
            e.preventDefault();
        });

        const addrole = shadow.querySelector('.link-role-add');
        addrole.addEventListener('click', function(e) {
            const client_id = input_client.value;
            const selector = showInView('Select Roles', `<role-selector client-id="${client_id}"></role-selector>`);
            
            selector.addEventListener('assign', function(e) {
                const roleIds = e.detail.roleIds;
                const user = shadow.querySelector('.tbl-users .form-input-selected:checked');
                const user_id = user.value;

                Users.addRoles(client_id, user_id, roleIds).then((r) => {
                    if (r.status == 'success') {
                        self._refreshRoles(client_id, user_id);
                    } else {
                        notify(r.status, r.message);
                    }
                });
                e.preventDefault();
            });
            e.preventDefault();
        });
    }

    _refreshUsers(client_id) {
        const self = this;
        Users.all(client_id).then((r) => {
            if (r.status == 'success') {
                const users = r.json.users;
                self.setUsers(users);
            }
        })
    }

    setUsers(users = []) {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = shadow.getElementById('client').value;

        const tbody = shadow.querySelector('table.tbl-users tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        users.forEach(u => {
            const tds = [];
            tds.push(`<td><input type="radio" name="selected" class="form-input-radio form-input-selected" title="Select User" value="${u.id}" /></td>`);
            tds.push(`<td><a class="link-edit" title="Edit User" href="#"><span class="material-icons">edit</span></a></td>`);
            tds.push(`<td><a class="link-active-user" title="Toggle Active State" href="#">${u.active}</a></td>`);
            tds.push(`<td><a class="link-email" title="Email ${u.email}" href="mailto: ${u.name} <${u.email}>">${u.email}</a></td>`);
            tds.push(`<td>${u.name}</td>`);
            const tdall = tds.join('');

            const tr = document.createElement('tr');
            tr.innerHTML = `
                ${tdall}
            `;

            tbody.appendChild(tr);

            // event handlers
            const edit = tr.querySelector('.link-edit');
            edit.addEventListener('click', function(e) {
                showInTab('admin.users', 'Edit User', `<user-editor user-id="${u.id}"></user-editor>`);
                e.preventDefault();
            });

            const active = tr.querySelector('.link-active-user');
            active.addEventListener('click', function(e) {
                console.log('toggle active');
                e.preventDefault();
            });

            const selected = tr.querySelector('.form-input-selected');
            selected.addEventListener('change', function(e) {
                const user_id = selected.value;
                self._refreshRoles(client_id, user_id);
            });
        });
    }

    _refreshRoles(client_id, user_id) {
        const self = this;
        Users.getRoles(client_id, user_id).then((r) => {
            if (r.status == 'success') {
                const roles = r.json.roles;
                self.setRoles(roles);
            } else {
                notify(r.status, r.message);
            }
        });
    }

    setRoles(roles = []) {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = shadow.getElementById('client').value;

        const tbody = shadow.querySelector('table.tbl-roles tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        roles.forEach((r) => {
            const tds = [];
            tds.push(`<td><a class="link-remove-role" title="Remove Role" href="#" data-roleid="${r.id}">&minus;</a></td>`);
            tds.push(`<td>${r.name}</td>`);
            const tdall = tds.join('');

            const tr = document.createElement('tr');
            tr.innerHTML = `
                ${tdall}
            `;

            tbody.appendChild(tr);

            // event handlers
            const remove = tr.querySelector('.link-remove-role');
            remove.addEventListener('click', function(e) {
                const role_id = remove.dataset.roleid;

                Users.removeRole(client_id, user_id, role_id).then((r) => {
                    if (r.status == 'success') {
                        self._refreshRoles(client_id, user_id);
                    } else {
                        notify(r.status, r.message);
                    }
                });
                e.preventDefault();
            });
        });
    }
}
customElements.define('client-users', ClientUsers);
export { ClientUsers };