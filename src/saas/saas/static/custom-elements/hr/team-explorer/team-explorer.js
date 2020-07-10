'use strict';
import { showInTab, notify } from '/static/js/ui/ui.js';
import { Members } from '/static/js/modules/hr/members.js';
class TeamExplorer extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/hr/team-explorer/team-explorer.css');

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

        this._attachEventHandlers = this._attachEventHandlers.bind(this);
        this.setMembers = this.setMembers.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const client_id = this.getAttribute('client-id');

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button id="btn-new" type="button" class="btn btn-new" title="New Team Member">
                    <span class="material-icons">person_add</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form class="form-filter">
                    <input type="hidden" id="client-id" name="client_id" value="${client_id}" />

                    <label for="filter">Filter</label>
                    <input type="search" id="filter" name="filter" class="form-input-filter" />
                    <button id="btn-filter" type="button" class="btn btn-filter" title="Search">
                        <span class="material-icons">search</span>
                    </button>
                </form>
            </div><!-- .form-wrapper -->
            <div class="table-wrapper">
                <table class="tbl-members">
                    <caption>Team Members</caption>
                    <colgroup>
                        <col class="col-edit">
                        <col class="col-name">
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    <tfoot>
                    </tfoot>
                </table>
            </div><!-- .table-wrapper -->
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        const beginsearch = function(filter) {
            Members.filter(client_id, filter).then((r) => {
                if (r.status == 'success') {
                    const members = r.json.members;
                    self.setMembers(members, filter);
                } else {
                    notify(r.status, r.message);
                }
            });
        };

        const filter = shadow.getElementById('filter');
        filter.addEventListener('keyup', function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                beginsearch(filter.value);
            }
        });

        const btnfilter = shadow.getElementById('btn-filter');
        btnfilter.addEventListener('click', function(e) {
            beginsearch(filter.value);
        });

        const btnnew = shadow.getElementById('btn-new');
        btnnew.addEventListener('click', function(e) {
            showInTab('member-editor', 'New Member', `<member-editor client-id="${client_id}"></member-editor>`);
        });
    }

    setMembers(members = [], filter = '') {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        const tbody = shadow.querySelector('table.tbl-members tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        members.forEach((m) => {
            const fname = m.firstName.replace(filter,`<strong>${filter}</strong>`);
            const mname = m.middleName.replace(filter,`<strong>${filter}</strong>`);
            const lname = m.lastName.replace(filter,`<strong>${filter}</strong>`);

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <a class="link-edit-member" title="Edit Member" href="#" data-id="${m.id}">
                        <span class="material-icons">edit</span>
                    </a>
                </td>
                <td>
                    <div class="name">
                        <span class="prefix">${m.prefix}</span>
                        <span class="first-name">${fname}</span>
                        <span class="middle-name">${mname}</span>
                        <span class="last-name">${lname}</span>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);

            // event handlers
            const edit = tr.querySelector('.link-edit-member');
            edit.addEventListener('click', function(e) {
                e.preventDefault();
                const member_id = edit.dataset.id;
                showInTab('member-editor', 'Member', `<member-editor client-id="${client_id}" member-id="${member_id}"></member-editor>`);
            });
        });
    }
}
customElements.define('team-explorer', TeamExplorer);