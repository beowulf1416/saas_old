'use strict';
import { notify, showInView } from '/static/js/ui/ui.js';
class MemberSelector extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/hr/member-selector/member-selector.css');

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

        this._attachEventHandlers();
    }

    _init(container) {
        const client_id = this.getAttribute('client-id');

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <label for="member">Member</label>
            <input type="text" id="member" name="member" class="form-input-member" title="Member" placeholder="Member" readonly />
            <button type="button" id="btn-member" class="btn btn-member" title="Select Member">...</button>
            <input type="hidden" id="member-id" name="member-id" />
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        const btnmember = shadow.getElementById('btn-member');
        btnmember.addEventListener('click', function(e) {
            const view = showInView('Members', `<member-selector-view client-id="${client_id}"></member-selector-view>`);
            view.addEventListener('selected', function(e) {
                console.log(e);
            });
        });
    }
}
customElements.define('member-selector', MemberSelector);