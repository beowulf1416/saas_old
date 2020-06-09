'use strict';
import { Permissions } from '/static/js/helpers/permissions.js';

class PermissionSelector extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/permission.selector/permission.selector.css');

        const google_web_fonts = document.createElement("link");
        google_web_fonts.setAttribute('rel', 'stylesheet');
        google_web_fonts.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this._init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(google_web_fonts);
        shadow.appendChild(div);

        this._setPermissions = this._setPermissions.bind(this);
        this._attachEventHandlers = this._attachEventHandlers.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const self = this;

        const div = document.createElement('div');
        div.innerHTML = `
            <div class="form-wrapper">
                <form class="form-permission-selector">
                    <label for="search">Permission</label>
                    <input type="search" id="search" name="search" class="form-input-search" title="Search Permission" placeholder="Permission" />
                    <button type="button" class="btn btn-search">
                        <span class="material-icons">search</span>
                    </button>
                </form>
            </div><!-- .form-wrapper -->
            <div class="table-wrapper">
                <table class="tbl-permissions">
                    <caption>Roles</caption>
                    <colgroup>
                    </colgroup>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div><!-- .table-wrapper -->
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const search = shadow.querySelector('button.btn-search');
        search.addEventListener('click', function(e) {
            const filter = shadow.querySelector('input.form-input-search');
            Permissions.filter(filter.value).then((r) => {
                if (r.status == 'success') {
                    self._setPermissions(r.json.permissions);
                } else {
                    console.error(r.message);
                }
            });
        });
    }

    _setPermissions(permissions = []) {
        const self = this;
        const shadow = this.shadowRoot

        const tbody = shadow.querySelector('table.tbl-permissions tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }
        permissions.forEach((p) => {
            const tds = []
            tds.push(`<td><input type="checkbox" id="${p.id}" name="selected" class="form-input-check" title="Select Permissions /></td>`)
            tds.push(`<td><label for="${p.id}">${p.name}</label>`)
            const tdall = tds.join('')

            const tr = document.createElement('tr');
            tr.innerHTML = `
                ${tdall}
            `;

            tbody.appendChild(tr);
        });
    }
}
customElements.define('permission-selector', PermissionSelector);
export { PermissionSelector };