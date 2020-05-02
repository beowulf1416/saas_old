'use strict';

class UsersList extends HTMLElement {

    constructor() {
        self = super();

        const div = document.createElement('div');
        div.classList.add('wrapper');

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(div);
    }
}

customElements.define('users-list', UsersList);
export { UsersList };