'use strict';

class PermissionsList extends HTMLElement {

    constructor() {
        self = super();

        const container = document.createElement('div');
        container.classList.add('container');
        
        this.initList(self, container);

        const shadow = this.shadowRoot;
        shadow.appendChild(container);
    }

    initList(component, container) {
        const list = document.createElement('ul');
        list.classList.add('permission-list');

        const div = document.createElement('div');
        div.classList.add('permission-list-container');
        div.appendChild(list);

        container.appendChild(div);
    }

    setRole(component, role) {
        console.log(role);
    }

    connectedCallback() {

    }
}

customElements.define('permissions-list', PermissionsList);
export { PermissionsList };