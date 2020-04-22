'use strict';

class ClientList extends HTMLElement {

    constructor() {
        self = super();

        const container = document.createElement('div');
        container.classList.add('client-list-container');

        self.initList(container);
        self.initActions(container);
        self.initFormAddClient(container);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(container);
    }

    initList(container) {
        const ul = document.createElement('ul');
        ul.classList.add('client-list');

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

        container.appendChild(ul);
    }

    initActions(container) {
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
        container.appendChild(containerActions);
    }

    initFormAddClient(container) {
        const formContainer = document.createElement('div');
        formContainer.classList.add('client-form');
        formContainer.innerHTML = `
            <form class="client-form">
                <fieldset>
                    <legend>Please enter required information</legend>
                    <div class="form-input">
                        <label for="clientName">Name</label>
                        <input type="text" id="clientName" name="clientName" class="client-name" />
                    </div><!-- .form-input -->
                    <div class="form-input">
                        <label for="clientAddress">Address</label>
                        <input type="text" id="clientAddress" name="clientAddress" class="client-addr" />
                    </div><!-- .form-input -->
                </fieldset>
                <div class="actions">
                    <button type="button" id="btnSave" class="btnSave">Save</button>
                </div><!-- .actions -->
            </form>
        `;

        container.appendChild(formContainer);
    }

    connectedCallback() {
        if (this.isConnected) {
            const btnSave = this.shadowRoot.getElementById('btnSave');
            btnSave.addEventListener('click', function(e) {
                console.log('btnSave.clicked');
            });
        }
    }
}

customElements.define('client-list', ClientList);
export { ClientList };