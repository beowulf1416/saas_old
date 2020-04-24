'use strict';

class RolesList extends HTMLElement {

    constructor() {
        self = super();

        const container = document.createElement('div');
        container.classList.add('role-list-container');

        self.initList(container);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(container);
    }

    initList(container) {
        const roleContainer = document.createElement('div');
        roleContainer.classList.add('role-container');
        roleContainer.innerHTML = `
            <ul id="roleList">
            </ul>
        `;

        container.appendChild(roleContainer);
    }

    setClient(clientId) {
        fetch('/api/admin/security/roles/all', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId
            })
        })
        .then((response) => { 
            return response.json();
        })
        .then((data) => {
            if (data && data.status == 'success') {
                const roles = JSON.parse(data.json);
                if (Array.isArray(roles)) {
                    const shadow = this.shadowRoot;
                    const ul = shadow.querySelector('ul#roleList');
                    roles.forEach((role) => {
                        const li = document.createElement('li');
                        li.classList.add('role-list-item');
                        li.innerHTML = `
                            <a class="nav-link role-link" title="${role.name}" href="#" data-id="${role.id}">${role.name}</a>
                        `;
    
                        ul.appendChild(li);
                    });
                } else {
                    console.error(roles);
                }
            } else {
                console.error(data);
            }
        });
    }

    connectedCallback() {
        
    }
}

customElements.define('roles-list', RolesList);
export { RolesList };