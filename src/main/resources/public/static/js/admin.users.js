'use strict';

class UsersList extends HTMLElement {

    constructor() {
        self = super();

        const container = document.createElement('div');
        container.classList.add('container');

        this.initList(self, container);

        const shadow = this.shadowRoot;
        shadow.appendChild(container);
    }

    initList(component, container) {
        const ul = document.createElement('ul');
        ul.classList.add('users-list');

        const div = document.createElement('div');
        div.classList.add('container-list');
        div.appendChild(ul);

        container.appendChild(div);
    }
}

customElements.define('users-list', UsersList);
export { UsersList };