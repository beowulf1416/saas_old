'use strict';
import { notify } from '/static/js/ui/ui.js';
import { Members } from '/static/js/modules/hr/members.js';
class MemberEditor extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/hr/member.editor/member.editor.css');

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

        this._getClientId = this._getClientId.bind(this);
        this._getMemberId = this._getMemberId.bind(this);
        this._attachEventHandlers = this._attachEventHandlers.bind(this);
        this._prefetch = this._prefetch.bind(this);
        
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
                    <fieldset>
                        <legend>Identifiers</legend>
                        <label for="sss">SSS</label>
                        <input type="text" id="sss" name="sss" class="form-input-sss" title="SSS" placeholder="SSS" />

                        <label for="tin">TIN</label>
                        <input type="text" id="tin" name="tin" class="form-input-tin" title="TIN" placeholder="TIN" />
                    </fieldset>
                    <fieldset>
                        <legend>Dates</legend>

                        <div class="form-group form-group-hire-date">
                            <!-- hire date -->
                            <label for="hire-date">Hire Date</label>
                            <input type="date" id="hire-date" name="hire_date" class="form-input-date-hire" title="Hire Date" />
                        </div><!-- .form-group -->
                    </fieldset>

                </form>
            </div><!-- .form-wrapper -->
        `;

        container.appendChild(div);
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

            const member = {
                clientId: client_id,
                memberId: member_id,
                firstName: first_name.value,
                middleName: middle_name.value,
                lastName: last_name.value,
                prefix: prefix.value,
                suffix: suffix.value
            };
            Members.save(member).then((r) => {
                notify.add(r.status, r.message);
            });
        });
    }

    _prefetch() {
        const self = this;
        const shadow = this.shadowRoot;

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
        console.log(member);
    }
}
customElements.define('member-editor', MemberEditor);