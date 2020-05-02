'use strict';

import { AdminClients } from "/static/js/api/admin.clients.js";

class AdminClientUsersTable extends HTMLElement {

    constructor() {
        self = super();

        const container = document.createElement('div');
        container.classList.add('component-wrapper');

        this.initTable(self, container);
        
        this.refresh = this.refresh.bind(this);
        this.setClient = this.setClient.bind(this);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(container);
    }

    connectedCallback() {
        if (this.isConnected) {
            const self = this;
        }
    }

    initTable(component, container) {
        const div = document.createElement('div');
        div.classList.add('tbl-wrapper');
        div.innerHTML = `
            <table class="users">
                <caption>Users</caption>
                <thead>
                    <tr>
                        <th></th>
                        <th>Status</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table><!-- .users -->
        `;

        container.append(div);
    }

    setClient(clientId) {
        const self = this;
        self.dataset.clientId = clientId;
        this.refresh();
    }

    refresh() {
        const self = this;
        const clientId = self.dataset.clientId;
        AdminClients.users(clientId, function(e) {
            if (e.status == 'success') {
                if (e.json) {
                    const data = JSON.parse(e.json);
                    if (Array.isArray(data)) {
                        const tbl = self.shadowRoot.querySelector("table.users tbody");
                        while(tbl.firstChild) {
                            tbl.removeChild(tbl.lastChild);
                        }
                        data.forEach(d => {
                            const tr = document.createElement('tr');
                            tr.classList.add('user-row');
                            tr.innerHTML = `
                                <td></td>
                                <td>${d.active}</td>
                                <td>${d.name}</td>
                                <td>${d.email}</td>
                            `;
                            tbl.appendChild(tr);
                        });

                        const tr = document.createElement('tr');
                        tr.classList.add('user-add');
                        tr.innerHTML = `
                            <td>
                                <a id="userAdd" class="nav-link user-row-add" title="Add User" href="#">Add User</a>
                            </td>
                        `;
                        tbl.appendChild(tr);

                        const lAdd = tbl.querySelector("a#userAdd");
                        lAdd.addEventListener('click', function(e) {
                            self.dispatchEvent(new CustomEvent('onadduser', {
                                bubbles: true,
                                cancelable: true
                            }));
                        });
                    } else {

                    }
                } else {
                    console.error(e.json);
                }
            } else {
                console.error(e.message);
            }
        });
    }
}

customElements.define('client-users-table', AdminClientUsersTable);
export { AdminClientUsersTable };