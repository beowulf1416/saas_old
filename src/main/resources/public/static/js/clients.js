'use strict';

(function() {
    class ClientSelection extends HTMLElement {

        constructor() {
            super();

            const elemDL = this.for;
            console.log(elemDL);

            const container = document.createElement('div');
            container.classList.add('client-selection');

            const shadow = this.attachShadow({ mode: 'open' });
            shadow.appendChild(container);
        }

        get for() {
            return this.getAttribute('for') || '';
        }
    }

    customElements.define('client-selection', ClientSelection);
})();