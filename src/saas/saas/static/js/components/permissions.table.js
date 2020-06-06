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

    setPermissions(permissions) {
        const showRemove = this.hasAttribute('show-remove');
        const multiselect = this.hasAttribute('multiselect');
        const classActive = this.hasAttribute('hide-active') ? "col-active col-hidden" : "col-active";

        const self = this;
        if (Array.isArray(permissions)) {
            const tbl = this.shadowRoot.querySelector('table.tbl-permissions');
            const tbody = this.shadowRoot.querySelector('table.tbl-permissions tbody');
            while(tbody.firstChild) {
                tbody.removeChild(tbody.lastChild);
            }
            
            permissions.forEach(p => {
                const tr = document.createElement('tr');
                tr.classList.add('permission-item');
                let tds = [];

                if (showRemove) {
                    tds.push(`<td class="col-action"><a class="nav-link link-remove-permission" title="Remove Permission" href="#" data-permissionid="${p.id}">&minus;</a></td>`);
                }

                if (multiselect) {
                    tds.push(`<td class="col-select"><input type="checkbox" name="selectedPermission" title="Select" class="form-input-radio permission-select" value="${p.id}" /></td>`);
                } else {
                    tds.push(`<td class="col-select"><input type="radio" name="selectedPermission" title="Select" class="form-input-radio permission-select" value="${p.id}" /></td>`);
                }

                tds.push(`<td class="${classActive}"><a title="Toggle Active" class="nav-link permission-active" href="#" data-id="${p.id}" data-active="${p.active}">${p.active}</a></td>`)
                tds.push(`<td class="col-name">${p.name}</td>`);

                tr.innerHTML = tds.join('');

                tbody.appendChild(tr);

                if (showRemove) {
                    const remove = tr.querySelector('a.link-remove-permission');
                    remove.addEventListener('click', function(e) {
                        self.dispatchEvent(new CustomEvent('onremovepermission', {
                            bubbles: true,
                            cancelable: true,
                            detail: {
                                permissionId: remove.dataset.permissionid
                            }
                        }));
                    });
                }

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
        const showAdd = this.hasAttribute('show-add');
        const showRemove = this.hasAttribute('show-remove');
        const classActive = this.hasAttribute('hide-active') ? 'col-active col-hidden' : 'col-active';

        const tds = [];
        if (showRemove) {
            tds.push(`<th class="col-action"></th>`);
        }
        tds.push('<th class="col-select"></th>');
        tds.push(`<th class="${classActive}">Active</th>`);
        tds.push('<th class="col-name">Name</th>');
        const thall = tds.join('');

        const div = document.createElement('div');
        div.classList.add('table-wrapper');
        div.innerHTML = `
            <form class="form-permissions">
                <table class="tbl-permissions">
                    <caption>Permissions</caption>
                    <thead>
                        <tr>
                            ${thall}
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    <tfoot>
                    </tfoot>
                </table><!-- .tbl-permissions -->
            </form>
        `;

        container.appendChild(div);

        if (showAdd) {
            const tr = document.createElement('tr');
            tr.classList.add('row-permission-add');
            tr.innerHTML = `
                <th class="col-action">
                    <a class="nav-link link-add-permission" title="Add Permission" href="#">&plus;</a>
                </th>
            `;
            const tfoot = div.querySelector('table.tbl-permissions tfoot');
            tfoot.appendChild(tr);

            const add = tr.querySelector('a.link-add-permission');
            add.addEventListener('click', function(e) {
                component.dispatchEvent(new CustomEvent('onaddpermission', {
                    bubbles: true,
                    cancelable: true
                }));
            });
        }
    }
}

customElements.define('permissions-table', PermissionsTable);
export { PermissionsTable };