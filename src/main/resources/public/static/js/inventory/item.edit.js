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
                <label for="id">Id</label>
                <input type="text" id="id" name="id" title="Item Id" />
            </div><!-- .form-group -->
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" title="Name" />
            </div><!-- .form-group -->
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" id="description" name="description" title="Item description" />
            </div><!-- .form-group -->
            <div class="form-group">
                <label for="make">Make</label>
                <input type="text" id="make" name="make" title="Item Make" />
            </div><!-- .form-group -->
            <div class="form-group">
                <label for="brand">Brand</label>
                <input type="text" id="brand" name="brand" title="Item brand" />
            </div><!-- .form-group -->
            <div class="form-group">
                <label for="model">Model</label>
                <input type="text" id="model" name="model" title="Item Model" />
            </div><!-- .form-group -->
            <div class="form-group">
                <label for="version">Version</label>
                <input type="text" id="version" name="version" title="Item Version" />
            </div><!-- .form-group -->
            <div class="form-group">
                <label for="sku">SKU</label>
                <input type="text" id="sku" name="sku" title="Item Stock Keeping Unit" />
            </div><!-- .form-group -->
            <div class="form-group">
                <label for="UPC">UPC</label>
                <input type="text" id="upc" name="uoc" title="Universal Product Code" />
            </div><!-- .form-group -->
        `;

        container.appendChild(fieldset);
    }
}

customElements.define('inventory-item-editor', InventoryItemEditor);
export { InventoryItemEditor };