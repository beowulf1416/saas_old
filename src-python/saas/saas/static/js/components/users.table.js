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
        const showAdd = this.hasAttribute('show-add');
        const classActive = this.hasAttribute('hide-active') ? 'col-active col-hidden' : 'col-active';

        const div = document.createElement('div');
        div.classList.add('tbl-wrapper');
        div.innerHTML = `
            <form class="form-users">
                <table class="tbl-users">
                    <caption>Users</caption>
                    <thead>
                        <tr>
                            <th class="col-select"></th>
                            <th class="${classActive}">Active</th>
                            <th class="col-name">Name</th>
                            <th class="col-email">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    <tfoot>
                    </tfoot>
                </table><!-- .tbl-users -->
            </form>
        `;

        container.append(div);

        if (showAdd) {
            const tr = document.createElement('tr');
            tr.classList.add('row-user-add');
            tr.innerHTML = `
                <th colspan="4">
                    <a title="Add User" id="addUser" class="nav-link link-add-user" href="#addUser">Add</a>
                </th>
            `;
            const tfooter = div.querySelector('table.tbl-users tfoot');
            tfooter.appendChild(tr);

            const addUser = tr.querySelector('#addUser');
            addUser.addEventListener('click', function(e) {
                component.dispatchEvent(new CustomEvent('onadduser', {
                    bubbles: true,
                    cancelable: true
                }))
            });
        }
    }

    setUsers(users) {
        const multiselect = this.hasAttribute('multiselect');
        const classActive = this.hasAttribute('hide-active') ? 'col-active col-hidden' : 'col-active';

        const self = this;
        if (Array.isArray(users)) {
            // const tbl = self.shadowRoot.querySelector("table.tbl-users");
            const tbody = self.shadowRoot.querySelector("table.tbl-users tbody");
            while(tbody.firstChild) {
                tbody.removeChild(tbody.lastChild);
            }

            users.forEach(u => {
                const tr = document.createElement('tr');
                tr.classList.add('user-row');

                const tds = [];

                if (multiselect) {
                    tds.push(`<td class="col-select"><input type="checkbox" name="selectedUser" class="form-input-check user-select" title="Select" value="${u.id}" /></td>`);
                } else {
                    tds.push(`<td class="col-select"><input type="radio" name="selectedUser" class="form-input-radio user-select" title="Select" value="${u.id}" /></td>`);
                }

                tds.push(`<td class="${classActive}"><a title="Toggle Active" class="nav-link user-active" href="#" data-id="${u.id}" data-active="${u.active}">${u.active}</a></td>`);
                tds.push(`<td class="col-name">${u.name}</td>`);
                tds.push(`<td class="col-email"><a class="nav-link nav-email" href="mailto: ${u.email}" title="Send email to ${u.email}">${u.email}</a></td>`);

                tr.innerHTML = tds.join('');
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