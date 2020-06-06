'use strict';

class ClientEditor extends HTMLElement {

    constructor() {
        self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/css/clients/client.editor.css');

        const container = document.createElement('div');
        container.classList.add('client-editor-container');

        this.initForm(self, container);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(container);
    }

    initForm(component, container) {
        const div = document.createElement('div');
        div.classList.add('form-wrapper');
        div.innerHTML = `
        <form class="form-client">
        </form><!-- .form-client -->
        `;

        container.appendChild(div);
    }
}
customElements.define('client-editor', ClientEditor);
export { ClientEditor };