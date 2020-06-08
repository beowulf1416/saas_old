'use strict';

import { view } from '/static/js/ui/views.js';
import { Clients } from '/static/js/helpers/clients/clients.js';
import { Roles } from '/static/js/helpers/roles.js';

class ClientRoles extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/client.roles/client.roles.css');

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

        this.setClientId = this.setClientId.bind(this);
        this._setRoles = this._setRoles.bind(this);
    }

    connectedCallback() {
        if (this.isConnected) {

        }
    }

    _init(container) {
        const self = this;

        const div = document.createElement('div');
        div.innerHTML = `
            <div class="form-wrapper">
                <form class="form-client-role">
                    <label for="search">Client</label>
                    <input type="text" id="client" name="client" title="Client" placeholder="Client" readonly />
                    <button type="button" class="btn btn-client">...</button>
                </form>
            </div><!-- .form-wrapper -->
            <div class="table-wrapper">
                <table class="tbl-roles">
                    <caption>Roles</caption>
                    <colgroup>
                    </colgroup>
                    <thead>
                        <th></th>
                        <th>Active</th>
                        <th>Name</th>
                    </thead>
                    <tbody>
                    </tbody>
                    <tfooter>
                        <tr>
                            <td><a title="Add Role" class="link-role-add" href="#">&plus;</a></td>
                        </tr>
                    </tfooter>
                </table>
                <table class="tbl-permissions">
                    <caption>Permissions</caption>
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
                            <td><a title="Add Permission" class="link-permission-add" href="#">&plus;</a></td>
                        </tr>
                    </tfooter>
                </table>
            </div><!-- .table-wrapper -->
        `;

        container.appendChild(div);

        const btnClient = div.querySelector('button.btn-client');
        btnClient.addEventListener('click', function(e) {
            const clientSelector = view('<client-selector></client-selector>');
            clientSelector.addEventListener('selected', function(e) {
                if (e.detail.client) {
                    const client_id = e.detail.client;
                    self.setClientId(client_id);
                }
            });
        });

        const linkAddRole = div.querySelector('a.link-role-add');
        linkAddRole.addEventListener('click', function(e) {
            const client = self.shadowRoot.getElementById('client');
            if (client.dataset.clientid) {
                const client_id = client.dataset.clientid;
                const roleSelector = view(`<role-selector client="${client_id}"></role-selector>`);
            } else {
                console.error('client id is required');
            }
        });
    }

    setClientId(client_id) {
        const self = this;
        const shadow = this.shadowRoot;

        Clients.get(client_id).then((r) => {
            if (r.status == 'success') {
                const client = r.json.client;
                
                const input_client = shadow.getElementById('client');
                input_client.dataset.clientid = client.id;
                input_client.value = client.name;
            } else {
                console.error(r.message);
            }
        });

        Roles.all(client_id).then((r) => {
            if (r.status == 'success') {
                self._setRoles(client_id, r.json.roles);
            } else {
                console.error(r.message);
            }
        });
    }

    _setRoles(client_id = '', roles = []) {
        const self = this;
        const shadow = this.shadowRoot;

        const tbody = shadow.querySelector('.tbl-roles tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        roles.forEach((r) => {
            const tds = [];
            tds.push(`<td><input type="radio" id="${r.id}" name="selected" class="form-input-radio" title="Select Role" value="${r.id}" /></td>`);
            tds.push(`<td><a class="link-active" title="Toggle Active State" href="#" data-roleid="${r.id}" data-active="${r.active}">${r.active}</a></td>`);
            tds.push(`<td><label for="${r.id}">${r.name}</label></td>`);
            const tdall = tds.join('');

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <tr>
                    ${tdall}
                </tr>
            `;

            tbody.appendChild(tr);

            const link_active = tr.querySelector('a.link-active');
            link_active.addEventListener('click', function(r) {
                const role_id = link_active.dataset.roleid;
                const state = link_active.dataset.active == 'true' ? 'false' : 'true';

                Roles.setActive(role_id, state).then((r) => {
                    if (r.status == 'success') {
                        Roles.all(client_id).then((r2) => {
                            if (r2.status == 'success') {
                                self._setRoles(client_id, r2.json.roles);
                            } else {
                                console.error(r2.message);
                            }
                        });
                    } else {
                        console.error(r.message);
                    }
                });
            });
        });
    }
}
customElements.define('client-roles', ClientRoles);
export { ClientRoles }