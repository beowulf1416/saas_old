'use strict';

class PermissionsTable extends HTMLElement {

    constructor() {
        self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/css/permissions.table.css');

        const div = document.createElement('div');
        div.classList.add('wrapper');

        this.initTable(self, div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(div);

        this.setPermissions = this.setPermissions.bind(this);
        this.getSelected = this.getSelected.bind(this);
    }

    setPermissions(permissions, options) {
        const self = this;
        if (Array.isArray(permissions)) {
            const tbl = this.shadowRoot.querySelector('table.tbl-permissions');
            if (options && options.hideActiveColumn == true) {
                tbl.classList.add('hide-active');
            }

            const tbody = this.shadowRoot.querySelector('table.tbl-permissions tbody');
            while(tbody.firstChild) {
                tbody.removeChild(tbody.lastChild);
            }
            
            permissions.forEach(p => {
                const tr = document.createElement('tr');
                tr.classList.add('permission-item');
                if (options && options.multiselect == true) {
                    tr.innerHTML = `
                        <td class="col-select">
                            <input type="checkbox" name="selectedPermission" title="Select" class="form-input-radio permission-select" value="${p.id}" />
                        </td>
                        <td class="col-active">
                            <a title="Toggle Active" class="nav-link permission-active" href="#" data-id="${p.id}" data-active="${p.active}">${p.active}</a>
                        </td>
                        <td class="col-name">${p.name}</td>
                    `;
                } else {
                    tr.innerHTML = `
                        <td class="col-select">
                            <input type="radio" name="selectedPermission" title="Select" class="form-input-radio permission-select" value="${p.id}" />
                        </td>
                        <td class="col-active">
                            <a title="Toggle Active" class="nav-link permission-active" href="#" data-id="${p.id}" data-active="${p.active}">${p.active}</a>
                        </td>
                        <td class="col-name">${p.name}</td>
                    `;
                }

                tbody.appendChild(tr);

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

                const aActive = tr.querySelector('a.permission-active');
                aActive.addEventListener('click', function(e) {
                    self.dispatchEvent(new CustomEvent('onupdatepermissionactive', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            permissionId: aActive.dataset.id,
                            active: aActive.dataset.active
                        }
                    }));
                });
            });

            if (options && options.allowAdd == true) {
                const tr = document.createElement('tr');
                tr.classList.add('permission-add');
                tr.innerHTML = `
                    <td colspan="3">
                        <a id="permissionAdd" class="nav-link permission-add" title="Add Permission" href="#">Add</a>
                    </td>
                `;
                tbody.appendChild(tr);

                const lAdd = tr.querySelector('a#permissionAdd');
                lAdd.addEventListener('click', function(e) {
                    self.dispatchEvent(new CustomEvent('onaddpermission', {
                        bubbles: true,
                        cancelable: true
                    }));
                });
            }
        } else {
            self.dispatchEvent(new CustomEvent('onerror', {
                bubbles: true,
                cancelable: true,
                detail: "Expected an array of permissions"
            }));
        }
    }

    getSelected() {
        const self = this;
        const shadow = this.shadowRoot;
        const permissions = [];
        const nl = shadow.querySelectorAll('input.permission-select:checked');
        nl.forEach(n => {
            permissions.push(n.value);
        });
        return permissions;
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
                            <th class="col-select"><th>
                            <th class="col-active">Active</th>
                            <th class="col-name">Name</th>
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