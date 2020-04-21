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
                console.log(data);
                if (Array.isArray(data)) {
                    data.forEach(client => {
                        // const a = document.createElement('a');
                        // a.classList.add('nav-link');
                        // a.classList.add('client-item-link');
                        // a.setAttribute('href', '#');
                        // a.setAttribute('title', client.name);
                        // a.innerText = client.name;
                        // a.dataset.id = client.id;



                        // const aRemove = document.createElement('a');
                        // aRemove.classList.add('client-item-remove-link');
                        // aRemove.setAttribute('title', 'Remove');
                        // aRemove.setAttribute('href', '#');
                        // aRemove.innerHTML = '&ominus;';
                        // aRemove.dataset.id = client.id;

                        const li = document.createElement('li');
                        li.classList.add('client-list-item');
                        li.innerHTML = `
                            <a class="nav-link client-item-link" title="${client.name}" href="#">${client.name}</a>
                            <span>&nbsp;</span>
                            <a class="nav-link client-item-remove-link" title="Remove" href="#">&ominus;</a>
                        `;
                        // li.appendChild(a);
                        // li.appendChild(aRemove);
                        
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