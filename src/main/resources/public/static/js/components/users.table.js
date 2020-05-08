'use strict';

class UsersTable extends HTMLElement {

    constructor() {
        self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/css/users.table.css');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this.initTable(self, div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(div);

        this.setUsers = this.setUsers.bind(this);
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
                <table class="tbl-users">
                    <caption>Users</caption>
                    <thead>
                        <tr>
                            <th class="col-select"></th>
                            <th class="col-active">Active</th>
                            <th class="col-name">Name</th>
                            <th class="col-email">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table><!-- .users -->
            </form>
        `;

        container.append(div);
    }

    setUsers(users, options) {
        const self = this;
        if (Array.isArray(users)) {
            const tbl = self.shadowRoot.querySelector("table.tbl-users");
            if (options && options.hideActiveColumn == true) {
                tbl.classList.add('hide-active');
            }

            const tbody = self.shadowRoot.querySelector("table.tbl-users tbody");
            while(tbody.firstChild) {
                tbody.removeChild(tbody.lastChild);
            }

            users.forEach(u => {
                const tr = document.createElement('tr');
                tr.classList.add('user-row');
                tr.innerHTML = `
                    <td class="col-select">
                        <input type="radio" name="selectedUser" class="form-input-radio user-select" title="Select" value="${u.id}" />
                    </td>
                    <td class="col-active">
                        <a title="Toggle Active" class="nav-link user-active" href="#" data-id="${u.id}" data-active="${u.active}">${u.active}</a>
                    </td>
                    <td class="col-name">${u.name}</td>
                    <td class="col-email">
                        <a class="nav-link nav-email" href="mailto: ${u.email}" title="Send email to ${u.email}">${u.email}</a>
                    </td>
                `;
                tbody.appendChild(tr);

                const userSelect = tr.querySelector('input.user-select');
                userSelect.addEventListener('change', function(e) {
                    self.dispatchEvent(new CustomEvent('onselectuser', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            userId: userSelect.value
                        }
                    }));
                });

                const aActive = tr.querySelector('a.user-active');
                aActive.addEventListener('click', function(e) {
                    self.dispatchEvent(new CustomEvent('onupdateuseractive', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            userId: aActive.dataset.id,
                            active: aActive.dataset.active
                        }
                    }));
                });
            });

            if (options && options.allowAdd == true) {
                const tr = document.createElement('tr');
                tr.classList.add('user-item-add');
                tr.innerHTML = `
                    <td colspan="4">
                        <a title="Add User" id="userAdd" class="nav-link user-item-add" href="#">Add</a>
                    </td>
                `;

                tbody.appendChild(tr);

                const userAdd = tr.querySelector('a.user-item-add');
                userAdd.addEventListener('click', function(e) {
                    self.dispatchEvent(new CustomEvent('onadduser', {
                        bubbles: true,
                        cancelable: true
                    }));
                });
            }
        } else {
            self.dispatchEvent(new CustomEvent('onerror', {
                bubbles: true,
                cancelable: true,
                detail: "Expecting and array of users"
            }));
        }
    }
}

customElements.define('users-table', UsersTable);
export { UsersTable };