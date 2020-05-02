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
        AdminClients.users(clientId, function(e) {
            console.log(e);
        });
    }

    refresh() {
        const self = this;
        // AdminClients.users()
    }
}

customElements.define('client-users-table', AdminClientUsersTable);
export { AdminClientUsersTable };