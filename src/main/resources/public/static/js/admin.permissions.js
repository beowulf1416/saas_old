'use strict';

class PermissionsList extends HTMLElement {

    constructor() {
        self = super();

        const container = document.createElement('div');
        container.classList.add('container');

        const shadow = this.shadowRoot;
        shadow.appendChild(container);
    }

    connectedCallback() {

    }
}

customElements.define('permissions-list', PermissionsList);
export { PermissionsList };