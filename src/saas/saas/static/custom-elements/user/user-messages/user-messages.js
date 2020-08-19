'use strict';
class UserMessages extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/user/user-messages/user-messages.css');

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
    }

    _init(container) {
        const div = document.createElement('div');
        div.innerHTML = `<h1>Messages should appear here</h1>`;
        container.appendChild(div);
    }
}
customElements.define('user-messages', UserMessages);