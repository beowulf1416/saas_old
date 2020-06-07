'use strict';

class ClientSelector extends HTMLElement {

    constructor() {
        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/client.selector/client.selector.css');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this.init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(div);
    }

    connectedCallback() {
        if (this.isConnected) {

        }
    }

    init(container) {
        const div = document.createElement('div');
        div.innerHTML = '<items-table></items-table>';

        container.appendChild(div);
    }
}
customElements.define('client-selector', ClientSelector);
export { ClientSelector };