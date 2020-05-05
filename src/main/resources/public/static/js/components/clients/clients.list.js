'use strict';

class ClientsList extends HTMLElement {

    constructor() {
        self = super();

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <ul class="list-clients">
            </ul><!-- .list-clients -->
        `;

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(div);

        this.setClients = this.setClients.bind(this);
    }

    setClients(clients) {
        const self = this;
        if (Array.isArray(clients)) {
            const ul = this.shadowRoot.querySelector('ul.list-clients');
            clients.forEach(c => {
                const li = document.createElement('li');
                li.classList.add('list-item', 'item-client');
                li.innerHTML = `
                    <a class="nav-link client-link" title="${c.name}" href="#" data-id="${c.id}">${c.name}</a>
                `;

                ul.appendChild(li);
                const a = li.querySelector('a.client-link');
                a.addEventListener('click', function(e) {
                    self.dispatchEvent(new CustomEvent('onselectclient', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            clientId: a.dataset.id
                        }
                    }));
                });
            });
        } else {
            console.error('clients should be an array');
        }
    }
}

customElements.define('clients-list', ClientsList);
export { ClientsList }