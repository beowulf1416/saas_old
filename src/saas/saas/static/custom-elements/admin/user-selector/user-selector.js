'use strict';
import { Users } from '/static/js/modules/admin/users.js';
import { notify } from '/static/js/ui/ui.js';

class UserSelector extends HTMLElement {
    
    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/admin/user-selector/user-selector.css');

        const default_style = document.createElement("link");
        default_style.setAttribute('rel', 'stylesheet');
        default_style.setAttribute('href', '/static/css/default.css');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this._init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(default_style);
        shadow.appendChild(div);

        this._attachEventHandlers = this._attachEventHandlers.bind(this);
        this.setUsers = this.setUsers.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="wrapper">
                <div class="form-wrapper">
                    <form class="form-user-selector">
                        <label for="filter">user</label>
                        <input type="search" id="filter" name="filter" class="form-input-search" />
                        <button type="button" class="btn btn-filter">
                            <span class="material-icons">search</span>
                        </button>
                    </form>
                </div><!-- .form-wrapper -->
                <table class="tbl-users">
                    <caption>Users</caption>
                    <colgroup>
                    </colgroup>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <a class="link-assign-user" title="Assign Users" href="#">
                                    <span class="material-icons">assignment_return</span>
                                </a>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div><!-- .wrapper -->
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const beginsearch = function(filter) {
            Users.filter(filter).then((r) => {
                if (r.status == 'success') {
                    self.setUsers(r.json.users);
                } else {
                    notify(r.status, r.message);
                }
            });
        };

        const filter = shadow.getElementById('filter');
        filter.addEventListener('keyup', function(e) {
            if (e.keyCode == 13) {
                beginsearch(filter.value);
                e.preventDefault();
            }
        });

        const btnfilter = shadow.querySelector('button.btn-filter');
        btnfilter.addEventListener('click', function(e) {
            beginsearch(filter.value);
        });

        const assign = shadow.querySelector('.link-assign-user');
        assign.addEventListener('click', function(e) {
            const userIds = [];
            const selected = shadow.querySelectorAll('.form-input-selected:checked');
            selected.forEach((u) => {
                userIds.push(u.value);
            });

            self.dispatchEvent(new CustomEvent('assign', {
                bubbles: true,
                cancelable: true,
                detail: {
                    userIds: userIds
                }
            }));
            e.preventDefault();
        });
    }

    setUsers(users = []) {
        const self = this;
        const shadow = this.shadowRoot;

        const tbody = shadow.querySelector('table.tbl-users tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        users.forEach((u) => {
            const tds = [];
            tds.push(`<td><input type="checkbox" name="selected" class="form-input-selected" title="Select User" value="${u.id}" /></td>`);
            tds.push(`<td>${u.name}</td>`);
            tds.push(`<td><a class="link-email" title="Email ${u.email}" href="mailto: ${u.name} <${u.email}>">${u.email}</a></td>`);
            const tdall = tds.join('');

            const tr = document.createElement('tr');
            tr.innerHTML = `
                ${tdall}
            `;

            tbody.appendChild(tr);
        });
    }
}
customElements.define('user-selector', UserSelector);
export { UserSelector };