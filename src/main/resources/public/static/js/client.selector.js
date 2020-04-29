'use strict';

class ClientSelector extends HTMLElement {

    constructor() {
        self = super();

        const container = document.createElement('div');
        container.classList.add('container');

        const form = document.createElement('form');
        form.classList.add('form-container');
        container.appendChild(form);

        this.initSelect(self, form);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(container);
    }

    initSelect(component, container) {
        const s = document.createElement('select');
        s.classList.add('client-select');
        s.title = 'Please select client';

        fetch('/api/clients/all', {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((data) => {
            if (data && data.json) {
                const clients = JSON.parse(data.json);
                if (Array.isArray(clients)) {
                    clients.forEach(c => {
                        const opt = document.createElement('option');
                        opt.value = c.id;
                        opt.text = c.name;
                        s.appendChild(opt);
                    });
                } else {
                    console.error(clients);
                }
            } else {
                console.error(data);
            }
        });

        container.appendChild(s);
    }

    connectedCallback() {

    }
}

customElements.define('client-selector', ClientSelector);
export { ClientSelector };