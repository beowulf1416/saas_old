'use strict';

class RolesList extends HTMLElement {

    constructor() {
        self = super();

        const container = document.createElement('div');
        container.classList.add('role-list-container');

        // self.initList(container);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(container);
    }

    initList(container) {
        const roleContainer = document.createElement('div');
        roleContainer.classList.add('role-container');

        const ul = document.createElement('ul');
        ul.classList.add('role-list');

        fetch('/api/admin/security/roles/all', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({
                clientId: ''
            })
        })
        .then((response) => { 
            return response.json();
        })
        .then((data) => {
            if (Array.isArray(data)) {
                data.forEach((role) => {
                    const li = document.createElement('li');
                    li.classList.add('role-list-item');
                    li.innerHTML = `
                        {{ role }}
                    `;

                    ul.appendChild(li);
                });
            }
        });

        roleContainer.appendChild(ul);
        container.appendChild(roleContainer);
    }

    connectedCallback() {
        
    }
}

customElements.define('roles-list', RolesList);
export { RolesList };