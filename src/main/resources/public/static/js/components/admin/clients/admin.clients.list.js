'use strict';

import { AdminClients } from '/static/js/api/admin.clients.js';


class ClientList extends HTMLElement {

    constructor() {
        self = super();

        const container = document.createElement('div');
        container.classList.add('client-list-container');

        self.initList = self.initList.bind(this);
        self.refresh = self.refresh.bind(this);

        self.initList(self, container);
        self.initActions(self, container);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(container);
    }

    initList(component, container) {
        const ul = document.createElement('ul');
        ul.classList.add('client-list');

        this.refresh();

        container.appendChild(ul);
    }

    refresh() {
        const self = this;
        AdminClients.all(function(e) {
            if (e && e.status == 'success') {
                const data = JSON.parse(e.json);
                if (Array.isArray(data)) {
                    const shadow = self.shadowRoot;
                    const ul = shadow.querySelector('ul.client-list');
                    while(ul.firstChild) {
                        ul.removeChild(ul.lastChild);
                    }

                    const clients = data;
                    clients.forEach(client => {
                        const li = document.createElement('li');
                        li.classList.add('client-list-item');
                        li.innerHTML = `
                            <a class="nav-link client-item-link" title="${client.name}" data-id="${client.id}" href="#">${client.name}</a>
                            <span>&nbsp;</span>
                            <a class="nav-link client-item-remove-link" title="Remove" href="#">&ominus;</a>
                        `;

                        ul.appendChild(li);
                    });
                } else {
                    console.error('unexpected data');
                }
            } else {
                console.error(e);
            }
        });
    }

    initActions(component, container) {
        const containerActions = document.createElement('div');
        containerActions.classList.add('actions-container');

        const bAdd = document.createElement('button');
        bAdd.classList.add('client-add');
        bAdd.title = 'Add Client';
        bAdd.innerHTML = '&oplus;';

        bAdd.addEventListener('click', function(e){
            component.dispatchEvent(new CustomEvent('addClient', {
                bubbles: true,
                cancelable: true
            }));
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

    initFormEditClient(container) {
        
    }

    connectedCallback() {
        if (this.isConnected) {
            const shadow = this.shadowRoot;
        }
    }

    attachClientItemClickEventHandler(component, container) {
        const items = container.querySelectorAll(".client-item-link");
        items.forEach(l => {
            l.addEventListener('click', function(e) {
                component.dispatchEvent(new CustomEvent('selectClient', {
                    bubbles: true,
                    cancelable: true,
                    detail: l.dataset.id
                }));
            });
        });
    }
}

customElements.define('client-list', ClientList);
export { ClientList };