'use strict';

class RoleSelector extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/role.selector/role.selector.css');

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

        this.setRoles = this.setRoles.bind(this);
    }

    _init(container) {
        const self = this;

        const div = document.createElement('div');
        div.innerHTML = `
            <div class="form-wrapper">
                
            </div><!-- .form-wrapper -->
        `;
    }

    setRoles(roles = []) {
        const self = this;
        const shadow = this.shadowRoot;


    }
}