'use strict';

class ItemEditor extends HTMLElement {

    constructor() {
        self = super();

        const div = document.createElement('div');
        div.classList.add('wrapper');

        this.initForm(self, div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(div);
    }

    initForm(component, container) {
        const div = document.createElement('div');
        div.classList.add('form-wrapper', 'form-item-wrapper');
        div.innerHTML = `
            <form class="form-item">
            </form>
        `;

        container.appendChild(form);
    }
}
customElements.define('item-editor', ItemEditor);
export { ItemEditor };