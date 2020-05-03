'use strict';

class UsersList extends HTMLElement {

    constructor() {
        self = super();

        const div = document.createElement('div');
        div.classList.add('wrapper');

        this.initList(self, div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(div);

        this.setUsers = this.setUsers.bind(this);
    }

    initList(component, container) {
        const div = document.createElement('div');
        div.classList.add('list-wrapper');
        div.innerHTML = `
            <h4>Users</h4>
            <ul class="user-list">
            </li>
        `;

        container.appendChild(div);
    }

    setUsers(users) {
        const self = this;
        const shadow = this.shadowRoot;
        const ul = shadow.querySelector('ul.user-list');
        if(Array.isArray(users)) {
            users.forEach(u => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <a class="nav-link user-list-item" title="${u.email}" href="#" data-id="${u.id}">${u.email}</a>
                `;

                ul.appendChild(li);
            });

            const links = ul.querySelectorAll('a.user-list-item');
            links.forEach(l => {
                l.addEventListener('click', function(e) {
                    self.dispatchEvent(new CustomEvent('onselectuser', {
                        bubbles: true,
                        cancelable: true,
                        detail: l.dataset.id
                    }));
                });
            });
        }
    }
}

customElements.define('users-list', UsersList);
export { UsersList };