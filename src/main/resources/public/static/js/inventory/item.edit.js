'use strict';

class InventoryItemEditor extends HTMLElement {

    constructor() {
        self = super();

        const form = document.createElement('form');
        form.classList.add('form-item-edit');

        this.initGeneral(self, form);

        const div = document.createElement('div');
        div.classList.add('container');
        div.appendChild(form);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(div);
    }

    initGeneral(component, container) {
        const fieldset = document.createElement('fieldset');
        fieldset.innerHTML = `
            <legend>General</legend>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" title="Name" />
            </div><!-- .form-group -->
        `;

        container.appendChild(fieldset);
    }
}

customElements.define('inventory-item-editor', InventoryItemEditor);
export { InventoryItemEditor };