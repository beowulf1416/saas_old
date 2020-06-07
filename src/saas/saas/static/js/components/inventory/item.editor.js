'use strict';
import { InventoryItem } from '/static/js/helpers/inventory/items.js';
import { ItemsTable } from '/static/js/components/inventory/items.table.js';

class ItemEditor extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/css/inventory/items.editor.css');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this.init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(div);
    }

    connectedCallback() {
        if (this.isConnected) {
            const self = this;
            const shadow = this.shadowRoot;

            const client_id = this.hasAttribute('client-id') ? this.getAttribute('client-id') : '';
        }
    }

    init(container) {
        const self = this;
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="form-wrapper">
                <form class="form-item-editor tabs">
                    <fieldset id="general">
                        <!-- name -->
                        <label for="name">Name</label>
                        <div class="form-group form-group-name">
                            <input type="text" id="name" name="name" class="form-input form-input-text" title="Name" placeholder="Name" />
                            <span class="help-text">Item name</span>
                        </div><!-- .form-group -->

                        <!-- description -->
                        <label for="description">Description</label>
                        <div class="form-group form-group-description">
                            <textarea id="description" name="description" class="form-input form-input-textarea" title="Description" placeholder="Description">
                            </textarea>
                            <span class="help-text">Description</span>
                        </div><!-- .form-group -->

                        <!-- sku -->
                        <label for="sku">SKU</label>
                        <div class="form-group form-group-sku">
                            <input type="text" id="sku" name="sku" class="form-input form-input-sku" title="Stock Keeping Unit" placeholder="SKU" />
                            <span class="help-text">Stock Keeping Unit</span>
                        </div><!-- .form-group -->

                        <!-- upc -->
                        <label for="sku">UPC/EAN</label>
                        <div class="form-group form-group-upc">
                            <input type="text" id="upc" name="upc" class="form-input form-input-upc" title="Universal Product Code" placeholder="UPC/EAN" />
                            <span class="help-text">Universal Product Code/International Article Number</span>
                        </div><!-- .form-group -->
                    </fieldset>
                </form>
            </div><!-- .form-wrapper -->
        `;

        container.appendChild(div);
    }
}
customElements.define('item-editor', ItemEditor);
export { ItemEditor };