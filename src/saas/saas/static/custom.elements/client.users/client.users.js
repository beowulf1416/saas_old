'use strict';
import { showInTab, showInView, notify } from '/static/js/ui/ui.js';
import { Users } from '/static/js/helpers/users.js';
import { Clients } from '/static/js/helpers/clients/clients.js';

class ClientUsers extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/client.users/client.users.css');

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
        this.setClientId = this.setClientId.bind(this);
        this._getClientId = this._getClientId.bind(this);
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
                    <input type="hidden" id="client_id" name="client_id" value="" />

                    <!-- client -->
                    <label for="client">Client</label>
                    <input type="text" id="client" name="client" title="Client" placeholder="Client" readonly />
                    <button type="button" class="btn btn-client">...</button>
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
                    <tfooter>
                        <tr>
                            <td><a title="Add User" class="link-user-add" href="#">&plus;</a></td>
                        </tr>
                    </tfooter>
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
                    <tfooter>
                        <tr>
                            <td><a title="Add Role" class="link-role-add" href="#">&plus;</a></td>
                        </tr>
                    </tfooter>
                </table>
            </div><!-- .table-wrapper -->
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const btnclient = shadow.querySelector('button.btn-client');
        btnclient.addEventListener('click', function(e) {
            const selector = showInView('Select Clients','<client-selector></client-selector>');
            selector.addEventListener('selected', function(e) {
                if (e.detail.client) {
                    const client_id = e.detail.client;
                    self.setClientId(client_id);
                }
                e.preventDefault();
            });
            e.preventDefault();
        });

        const adduser = shadow.querySelector('.link-user-add');
        adduser.addEventListener('click', function(e) {
            const client_id = self._getClientId();
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
            const client_id = self._getClientId();
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

    setClientId(client_id = '') {
        const self = this;
        const shadow = this.shadowRoot;

        const client = shadow.getElementById('client_id');
        client.value = client_id;

        Clients.get(client_id).then((r) => {
            if (r.status == 'success') {
                const client = r.json.client;
                const client_name = shadow.getElementById('client');
                client_name.value = client.name;
            } else {
                notify(r.status, r.message);
            }
        });

        self._refreshUsers(client_id);
    }

    _getClientId() {
        const shadow = this.shadowRoot;

        const client = shadow.getElementById('client_id');
        return client.value;
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
                const client_id = self._getClientId();
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
                const client_id = self._getClientId();
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