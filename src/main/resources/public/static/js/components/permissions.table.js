'use strict';

class PermissionsTable extends HTMLElement {

    constructor() {
        self = super();

        const div = document.createElement('div');
        div.classList.add('wrapper');

        this.initTable(self, div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(div);

        this.setPermissions = this.setPermissions.bind(this);
    }

    setPermissions(permissions) {
        const self = this;
        if (Array.isArray(permissions)) {
            const tbl = this.shadowRoot.querySelector('table.tbl-permissions tbody');
            while(tbl.firstChild) {
                tbl.removeChild(tbl.lastChild);
            }
            permissions.forEach(p => {
                const tr = document.createElement('tr');
                tr.classList.add('permission-item');
                tr.innerHTML = `
                    <td>
                        <input type="radio" name="selectedPermission" class="form-input-radio permission-select" value="${p.id}" />
                    </td>
                    <td>${p.active}</td>
                    <td>${p.name}</td>
                `;

                tbl.appendChild(tr);

                const permSelect = tr.querySelector('input.permission-select');
                permSelect.addEventListener('change', function(e) {
                    self.dispatchEvent(new CustomEvent('onselectpermission', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            permissionId: permSelect.value
                        }
                    }));
                });
            });
        } else {
            self.dispatchEvent(new CustomEvent('onerror', {
                bubbles: true,
                cancelable: true,
                detail: "Expected an array of permissions"
            }));
        }
    }

    initTable(component, container) {
        const div = document.createElement('div');
        div.classList.add('table-wrapper');
        div.innerHTML = `
            <form class="form-permissions">
                <table class="tbl-permissions">
                    <caption>Permissions</caption>
                    <thead>
                        <tr>
                            <th><th>
                            <th>Active</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table><!-- .tbl-permissions -->
            </form>
        `;

        container.appendChild(div);
    }
}

customElements.define('permissions-table', PermissionsTable);
export { PermissionsTable };