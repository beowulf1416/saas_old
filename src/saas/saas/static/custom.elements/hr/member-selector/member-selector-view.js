'use strict';
import { notify } from '/static/js/ui/ui.js';
import { Util } from '/static/js/util.js';
import { Members } from '/static/js/modules/hr/members.js';
class MemberSelectorView extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/hr/member-selector/member-selector-view.css');

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
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="form-wrapper">
                <label for="filter">Member</label>
                <input type="search" id="filter" name="filter" class="form-input-filter" title="Search for Member" placeholder="Member" />
                <button type="button" id="btn-filter" class="btn btn-filter title="Search">
                    <span class="material-icons">search</span>
                </button> 
            </div><!-- .form-wrapper -->
            <div class="table-wrapper">
                <table id="tbl-members">
                    <caption>Members</caption>
                    <colgroup>
                        <col class="select">
                        <col class="name">
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tfoot>
                    </tfoot>
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
    }

    setMembers(members = [], filter = '') {
        const self = this;
        const shadow = this.shadowRoot;

        const tbody = shadow.getElementById('tbl-members');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        members.forEach((m) => {
            const id = 'id' + Util.generateId();
            let name = `<span>${m.firstName}</span> <span>${m.middleName}</span> <span>${m.lastName}</span>`;
            name = name.replaceAll(filter, `<strong>${filter}</strong>`);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <input type="radio" id="${id}" name="selected" class="form-input-selected" title="Select Member" value="${m.id}" />
                </td>
                <td>
                    <label for="${id}">${name}</label>
                </td>
            `;

            tbody.appendChild(tr);

            // event handlers
            const selected = tr.querySelector(`#${id}`);
            selected.addEventListener('change', function(e) {
                self.dispatchEvent(new CustomEvent('selected', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        memberId: selected.value
                    }
                }));
            });
        });
    }
}
customElements.define('member-selector-view', MemberSelectorView);