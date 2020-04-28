'use strict';

class ClientSelector extends HTMLElement {

    constructor() {
        self = super();

        const container = document.createElement('div');
        container.classList.add('container');

        const shadow = this.shadowRoot;
        shadow.appendChild(container);
    }

    initSelect(component, container) {
        const s = document.createElement('select');
        s.classList.add('client-select');

        

        container.appendChild(s);
    }

    connectedCallback() {

    }
}

customElements.define('client-selector', ClientSelector);
exports { ClientSelector };