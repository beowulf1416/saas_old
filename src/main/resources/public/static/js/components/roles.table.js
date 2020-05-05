'use strict';

class RolesTable extends HTMLElement {

    constructor() {
        self = super();

        const div = document.createElement('div');
        div.classList('wrapper');

        this.initTable(self, div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(div);

        this.setRoles = this.setRoles.bind(this);
    }

    setRoles(roles) {
        const self = this;
        if (Array.isArray(roles)) {

        } else {
            self.dispatchEvent(new CustomEvent('onerror', {
                bubbles: true,
                cancelable: true,
                detail: "Expecting an array of roles"
            }));
        }
    }

    initTable(component, container) {
        const div = document.createElement('div');
        div.classList.add('table-wrapper');
        div.innerHTML = `
            <table class="tbl-roles">
                <thead>
                    <tr>
                        <th></th>
                        <th>Active</th>
                        <th>Name</th>
                    </tr>
                </thead>
            </table><!-- .tbl-roles -->
        `;

        container.appendChild(div);
    }
}

customElements.define('roles-table', RolesTable);
export { RolesTable };