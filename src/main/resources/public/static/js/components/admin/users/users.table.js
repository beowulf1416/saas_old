'use strict';

class AdminUsersTable extends HTMLElement {

    constructor() {
        self = super();

        const div = document.createElement('div');
        div.classList.add('wrapper');

        this.initTable(self, div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(div);
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
            </table>
        `;

        container.appendChild(div);
    }
}

customElements.define('users-table', AdminUsersTable);
export { AdminUsersTable };