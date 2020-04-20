'use strict';

(function() {
    class ClientSelection extends HTMLElement {

        constructor() {
            super();

            const container = document.createElement('div');
            container.classList.add('client-selection');

            const shadow = this.attachShadow({ mode: 'open' });
            shadow.appendChild(container);
        }
    }

    customElements.define('client-selection', ClientSelection);
})();