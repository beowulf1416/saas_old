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
            <form class="form-users">
                <table class="users">
                    <caption>Users</caption>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Active</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table><!-- .users -->
            </form>
        `;

        container.append(div);
    }

    setUsers(users) {
        const self = this;
        if (Array.isArray(users)) {
            const tbl = self.shadowRoot.querySelector("table.users tbody");
            users.forEach(u => {
                const tr = document.createElement('tr');
                tr.classList.add('user-row');
                tr.innerHTML = `
                    <td>
                        <input type="radio" name="selectedUser" class="user-select" title="Select" value="${u.id}" />
                    </td>
                    <td>${u.active}</td>
                    <td>${u.name}</td>
                    <td>
                        <a class="nav-link nav-email" href="mailto: ${u.email}" title="Send email to ${u.email}">${u.email}</a>
                    </td>
                `;
                tbl.appendChild(tr);

                const userSelect = tr.querySelector('input.user-select');
                userSelect.addEventListener('change', function(e) {
                    self.dispatchEvent(new CustomEvent('onselectuser', {
                        bubbles: true,
                        cancelable: true,
                        detail: userSelect.value
                    }));
                });
            });
        } else {
            self.dispatchEvent(new CustomEvent('onerror', {
                bubbles: true,
                cancelable: true,
                detail: "Expecting and array of users"
            }));
        }
    }

    // refresh() {
    //     const self = this;
    //     const clientId = self.dataset.clientId;
    //     AdminClients.users(clientId, function(e) {
    //         if (e.status == 'success') {
    //             if (e.json) {
    //                 const data = JSON.parse(e.json);
    //                 if (Array.isArray(data)) {
    //                     const tbl = self.shadowRoot.querySelector("table.users tbody");
    //                     while(tbl.firstChild) {
    //                         tbl.removeChild(tbl.lastChild);
    //                     }
    //                     data.forEach(d => {
    //                         const tr = document.createElement('tr');
    //                         tr.classList.add('user-row');
    //                         tr.innerHTML = `
    //                             <td>
    //                                 <input type="radio" name="selectedUser" class="user-select" title="Select" value="${d.id}" />
    //                             </td>
    //                             <td>${d.active}</td>
    //                             <td>${d.name}</td>
    //                             <td>
    //                                 <a class="nav-link nav-email" href="mailto: ${d.email}" title="Send email to ${d.email}">${d.email}</a>
    //                             </td>
    //                         `;
    //                         tbl.appendChild(tr);

    //                         const userSelect = tr.querySelector('input.user-select');
    //                         userSelect.addEventListener('change', function(e) {
    //                             self.dispatchEvent(new CustomEvent('onselectuser', {
    //                                 bubbles: true,
    //                                 cancelable: true,
    //                                 detail: userSelect.value
    //                             }));
    //                         });
    //                     });

    //                     const tr = document.createElement('tr');
    //                     tr.classList.add('user-add');
    //                     tr.innerHTML = `
    //                         <td>
    //                             <a id="userAdd" class="nav-link user-row-add" title="Add User" href="#">Add User</a>
    //                         </td>
    //                     `;
    //                     tbl.appendChild(tr);

    //                     const lAdd = tbl.querySelector("a#userAdd");
    //                     lAdd.addEventListener('click', function(e) {
    //                         self.dispatchEvent(new CustomEvent('onadduser', {
    //                             bubbles: true,
    //                             cancelable: true
    //                         }));
    //                     });
    //                 } else {

    //                 }
    //             } else {
    //                 console.error(e.json);
    //             }
    //         } else {
    //             console.error(e.message);
    //         }
    //     });
    // }
}

customElements.define('client-users-table', AdminClientUsersTable);
export { AdminClientUsersTable };