'use strict';

class ClientSelector extends HTMLElement {

    constructor() {
        self = super();

        const container = document.createElement('div');
        container.classList.add('container');

        this.initSelect(self, container);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(container);
    }

    initSelect(component, container) {
        fetch('/api/clients/all', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((data) => console.log(data));

        const s = document.createElement('select');
        s.classList.add('client-select');

        

        container.appendChild(s);
    }

    connectedCallback() {

    }
}

customElements.define('client-selector', ClientSelector);
export { ClientSelector };