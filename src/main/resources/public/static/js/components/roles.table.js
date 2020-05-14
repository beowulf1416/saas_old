'use strict';

class RolesTable extends HTMLElement {

    constructor() {
        self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/css/roles.table.css');

        const div = document.createElement('div');
        div.classList.add('wrapper');

        this.initTable(self, div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(div);

        this.getSelectedRoles = this.getSelectedRoles.bind(this);
        this.setRoles = this.setRoles.bind(this);
    }

    getSelectedRoles() {
        const self = this;
        const shadow = this.shadowRoot;
        const roles = [];
        const nl = shadow.querySelectorAll('input.role-select:checked');
        nl.forEach(n => {
            roles.push(n.value);
        });
        return roles;
    }

    setRoles(roles) {
        const multiselect = this.hasAttribute('multiselect');
        const classActive = this.hasAttribute('hide-active') ? 'col-active col-hidden' : 'col-active';

        const self = this;
        const shadow = this.shadowRoot;
        if (Array.isArray(roles)) {
            const tbody = shadow.querySelector('table.tbl-roles tbody');
            while(tbody.firstChild) {
                tbody.removeChild(tbody.lastChild);
            }
            roles.forEach(r => {
                const tr = document.createElement('tr');
                tr.classList.add('role-item');
                const tds = [];

                if (multiselect) {
                    tds.push(`<td class="col-select"><input type="checkbox" name="selectedRole" class="form-input-check role-select" value="${r.id}" /></td>`);
                } else {
                    tds.push(`<td class="col-select"><input type="radio" name="selectedRole" class="form-input-radio role-select" value="${r.id}" /></td>`);
                }

                tds.push(`<td class="${classActive}"><a title="Toggle Active" class="nav-link role-active" data-id="${r.id}" data-active="${r.active}" href="#">${r.active}</a></td>`);
                tds.push(`<td class="col-name">${r.name}</td>`);

                tr.innerHTML = tds.join('');
                tbody.appendChild(tr);

                const roleSelect = tr.querySelector('input.role-select');
                roleSelect.addEventListener('change', function(e) {
                    self.dispatchEvent(new CustomEvent('onselectrole', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            roleId: roleSelect.value
                        }
                    }));
                });

                const aActive = tr.querySelector('a.role-active');
                aActive.addEventListener('click', function(e) {
                    self.dispatchEvent(new CustomEvent('onupdateroleactive', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            roleId: aActive.dataset.id,
                            active: aActive.dataset.active
                        }
                    }));
                });
            });
        } else {
            self.dispatchEvent(new CustomEvent('onerror', {
                bubbles: true,
                cancelable: true,
                detail: "Expecting an array of roles"
            }));
        }
    }

    initTable(component, container) {
        const classActive = this.hasAttribute('hide-active') ? 'col-active col-hidden' : 'col-active';
        const showAdd = this.hasAttribute('show-add');

        const div = document.createElement('div');
        div.classList.add('table-wrapper');
        div.innerHTML = `
            <form class="form-roles">
            <table class="tbl-roles">
                    <caption>Roles</caption>
                    <thead>
                        <tr>
                            <th class="col-select"></th>
                            <th class="${classActive}>Active</th>
                            <th class="col-name">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    <tfoot>
                    </tfoot>
                </table><!-- .tbl-roles -->
            </form>
        `;

        container.appendChild(div);

        if (showAdd) {
            const tr = document.createElement('tr');
            tr.classList.add('row-role-add');
            tr.innerHTML = `
                <th colspan="3">
                    <a id="roleAdd" class="nav-link link-add" title="Add Role" href="#roleAdd">Add</a>
                </th>
            `;
            const tfoot = div.querySelector('table.tbl-roles tfoot');
            tfoot.appendChild(tr);

            const add = tr.querySelector('#roleAdd');
            add.addEventListener('click', function(e) {
                component.dispatchEvent(new CustomEvent('onaddrole', {
                    bubbles: true,
                    cancelable: true
                }));
            });
        }
    }
}

customElements.define('roles-table', RolesTable);
export { RolesTable };