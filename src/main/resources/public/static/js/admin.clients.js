'use strict';

class ClientList extends HTMLElement {

    constructor() {
        self = super();

        const containerActions = document.createElement('div');
        containerActions.classList.add('actions-container');

        const bAdd = document.createElement('button');
        bAdd.classList.add('client-add');
        bAdd.setAttribute('title', 'Add Client');
        bAdd.innerHTML = '&oplus;';

        self.addClientEvent = new CustomEvent('addClient', {
            bubbles: true,
            cancelable: true
        });
        bAdd.addEventListener('click', function(e){
            self.dispatchEvent(self.addClientEvent);
        });

        containerActions.appendChild(bAdd);

        const ul = document.createElement('ul');
        ul.classList.add('client-list');

        const container = document.createElement('div');
        container.classList.add('client-list-container');
        container.appendChild(ul);
        container.appendChild(containerActions);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(container);

        fetch('/api/admin/clients/all', {
            method: 'POST',
            credentials: 'same-origin'
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // console.log(data);
            if (Array.isArray(data)) {
                data.forEach(client => {
                    const li = document.createElement('li');
                    li.classList.add('client-list-item');
                    li.innerHTML = `
                        <a class="nav-link client-item-link" title="${client.name}" href="#">${client.name}</a>
                        <span>&nbsp;</span>
                        <a class="nav-link client-item-remove-link" title="Remove" href="#">&ominus;</a>
                    `;
                    
                    ul.appendChild(li);
                });
            }
        });
    }

    connectedCallback() {
    }
}

customElements.define('client-list', ClientList);
export { ClientList };