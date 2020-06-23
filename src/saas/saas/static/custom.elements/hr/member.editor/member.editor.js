'use strict';
import { notify } from '/static/js/ui/ui.js';
import { tabs } from '/static/js/ui/tabs.js';
import { Members } from '/static/js/modules/hr/members.js';
import { IdTypes } from '/static/js/modules/hr/idtypes.js';
class MemberEditor extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/hr/member.editor/member.editor.css');

        const style_tabs = document.createElement("link");
        style_tabs.setAttribute('rel', 'stylesheet');
        style_tabs.setAttribute('href', '/static/css/ui/tabs.css');

        const google_web_fonts = document.createElement("link");
        google_web_fonts.setAttribute('rel', 'stylesheet');
        google_web_fonts.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this._init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(style_tabs);
        shadow.appendChild(google_web_fonts);
        shadow.appendChild(div);

        this._getClientId = this._getClientId.bind(this);
        this._getMemberId = this._getMemberId.bind(this);
        this._attachEventHandlers = this._attachEventHandlers.bind(this);
        this._prefetch = this._prefetch.bind(this);
        this.setMember = this.setMember.bind(this);
        this.setIds = this.setIds.bind(this);
        
        this._attachEventHandlers();
        this._prefetch();
    }

    _init(container) {
        const client_id = this.getAttribute('client-id');
        const member_id = this.hasAttribute('member-id') ? this.getAttribute('member-id') : uuidv4();

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button id="btn-save" type="button" class="btn btn-save" title="Save">
                    <span class="material-icons">save</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form class="form-member">
                    <input type="hidden" id="client-id" name="client_id" value="${client_id}" />
                    <input type="hidden" id="member-id" name="member_id" value="${member_id}" />

                    <div class="tabs" role="tabs">
                        <ul class="tab-list" role="tablist">
                            <li><a role="tab" aria-controls="general">General</a></li>
                            <li><a role="tab" aria-controls="identifiers">Identifiers</a></li>
                            <li><a role="tab" aria-controls="chronology">Chronology</a></li>
                        </ul><!-- .tab-list -->
                        
                        <!-- tab panels -->
                        <div id="general" class="tab-panel" role="tabpanel">
                            <fieldset>
                                <legend>Name</legend>
                                <div class="form-group form-group-name">
                                    <!-- first name -->
                                    <label for="first-name">First Name</label>
                                    <input type="text" id="first-name" name="first_name" class="form-input-first" title="First Name" placeholder="First Name" />

                                    <!-- middle name -->
                                    <label for="middle-name">Middle Name</label>
                                    <input type="text" id="middle-name" name="middle_name" class="form-input-middle" title="Middle Name" placeholder="Middle Name" />

                                    <!-- last name -->
                                    <label for="last-name">Last Name</label>
                                    <input type="text" id="last-name" name="last_name" class="form-input-last" title="Last Name" placeholder="Last Name" />
                                </div><!-- .form-group -->

                                <!-- prefix -->
                                <label for="prefix">Prefix</label>
                                <input type="text" id="prefix" name="prefix" class="form-input-prefix" title="Prefix" placeholder="Prefix" />

                                <!-- suffix -->
                                <label for="suffix">Suffix</label>
                                <input type="suffix" id="suffix" name="suffix" class="form-input-suffix" title="Suffix" placeholder="Suffix" />
                            </fieldset>
                        </div><!-- .tab-panel -->

                        <div id="identifiers" class="tab-panel" role="tabpanel">
                            <div class="table-wrapper">
                                <table class="tbl-ids">
                                    <caption>Identifiers</caption>
                                    <colgroup>
                                        <col class="col-addremove">
                                        <col class="col-type">
                                        <col class="col-value">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Value</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <td>
                                                <a id="link-add-id" class="link-add-id" href="#" title="Add Identifier">&plus;</a>
                                            </td>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div><!-- .table-wrapper -->
                        </div><!-- .tab-panel -->

                        <div id="chronology" class="tab-panel" role="tabpanel">
                            <div class="table-wrapper">
                                <table class="tbl-dates">
                                    <caption>Chronology</caption>
                                    <colgroup>
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Date</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                    <tr>
                                        <td>
                                            <a id="link-add-date" class="link-add-date" href="#" title="Add Date">&plus;</a>
                                        </td>
                                    </tr>
                                    </tfoot>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div><!-- .table-wrapper -->
                        </div><!-- .tab-panel -->
                    </div><!-- .tabs -->
                </form>
            </div><!-- .form-wrapper -->
        `;

        container.appendChild(div);
        tabs(container);
    }

    _getClientId() {
        const shadow = this.shadowRoot;
        const client = shadow.getElementById('client-id');
        return client.value;
    }

    _getMemberId() {
        const shadow = this.shadowRoot;
        const member = shadow.getElementById('member-id');
        return member.value;
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this._getClientId();
        const member_id = this._getMemberId();

        const btnsave = shadow.getElementById('btn-save');
        btnsave.addEventListener('click', function(e) {
            const first_name = shadow.getElementById('first-name');
            const middle_name = shadow.getElementById('middle-name');
            const last_name = shadow.getElementById('last-name');
            const prefix = shadow.getElementById('prefix');
            const suffix = shadow.getElementById('suffix');

            const ids = [];
            const trs = shadow.querySelectorAll('table.tbl-ids tbody tr');
            trs.forEach((tr) => {
                const id_type = tr.querySelector('.form-input-type');
                const id = tr.querySelector('.form-input-id');

                ids.push({
                    'idType': id_type.value,
                    'value': id.value
                })
            });

            const member = {
                clientId: client_id,
                memberId: member_id,
                firstName: first_name.value,
                middleName: middle_name.value,
                lastName: last_name.value,
                prefix: prefix.value,
                suffix: suffix.value,
                identifiers: ids
            };

            Members.save(member).then((r) => {
                notify.add(r.status, r.message);
            });
        });

        const linkaddid = shadow.getElementById('link-add-id');
        linkaddid.addEventListener('click', function(e) {
            e.preventDefault();

            const opts = [];
            self._id_types.forEach((t) => {
                opts.push(`<option value="${t.id}">${t.name}</option>`);
            });
            const options = opts.join('');

            const tbody = shadow.querySelector('table.tbl-ids tbody');
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <a class="link-remove-id" href="#" title="Remove Id">&minus;</a>
                </td>
                <td>
                    <select class="form-input-type" title="Id Type">
                        ${options}
                    </select>
                </td>
                <td>
                    <input type="text" class="form-input-id" title="Identifier" placeholder="Id" />
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    _prefetch() {
        const self = this;
        const shadow = this.shadowRoot;

        IdTypes.all().then((r) => {
            if (r.status == 'success') {
                const types = r.json.types;
                self._id_types = types;
            } else {
                notify(r.status, r.message);
            }
        });

        if (this.hasAttribute('member-id')) {
            const client_id = this._getClientId();
            const member_id = this._getMemberId();

            Members.get(client_id, member_id).then((r) => {
                if (r.status == 'success') {
                    self.setMember(r.json.member);
                } else {
                    notify(r.status, r.message);
                }
            });
        }
    }

    setMember(member = {}) {
        const self = this;
        const shadow = this.shadowRoot;

        shadow.getElementById('first-name').value = member.firstName;
        shadow.getElementById('middle-name').value = member.middleName;
        shadow.getElementById('last-name').value = member.lastName;
        shadow.getElementById('prefix').value = member.prefix;
        shadow.getElementById('suffix').value = member.suffix;

        const opts = [];
        self._id_types.forEach((t) => {
            opts.push(`<option value="${t.id}">${t.name}</option>`);
        });
        const options = opts.join('');

        const tbody = shadow.querySelector('table.tbl-ids tbody');
        const identifiers = member.identifiers;
        identifiers.forEach((id) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <a class="link-remove-id" href="#" title="Remove Id">&minus;</a>
                </td>
                <td>
                    <select class="form-input-type" title="Id Type">
                        ${options}
                    </select>
                </td>
                <td>
                    <input type="text" class="form-input-id" title="Identifier" placeholder="Id" />
                </td>
            `;
            tbody.appendChild(tr);

            const type = tr.querySelector('.form-input-type');
            type.value = id.idType;

            const value = tr.querySelector('.form-input-id');
            value.value = id.value;
        });

    }

    setIds(ids = []) {
        const self = this;
        const shadow = this.shadowRoot;
    }
}
customElements.define('member-editor', MemberEditor);