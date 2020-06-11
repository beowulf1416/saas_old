'use strict';
import { InventoryItem } from '/static/js/helpers/inventory/items.js';
import { ItemsTable } from '/static/js/components/inventory/items.table.js';

import { tabs } from '/static/js/ui/tabs.js';

class ItemEditor extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/inventory/item.editor/item.editor.css');

        const google_web_fonts = document.createElement("link");
        google_web_fonts.setAttribute('rel', 'stylesheet');
        google_web_fonts.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons');

        const tb = document.createElement("link");
        tb.setAttribute('rel', 'stylesheet');
        tb.setAttribute('href', '/static/css/toolbar.css');

        const tabs = document.createElement("link");
        tabs.setAttribute('rel', 'stylesheet');
        tabs.setAttribute('href', '/static/css/ui/tabs.css');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this._init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(google_web_fonts);
        shadow.appendChild(tb);
        shadow.appendChild(tabs);
        shadow.appendChild(div);

        this._attachEventHandlers = this._attachEventHandlers.bind(this);
        this._getClientId = this._getClientId.bind(this);
        this._getItemId = this._getItemId.bind(this);

        this._attachEventHandlers();
    }

    connectedCallback() {
        if (this.isConnected) {
            const self = this;
            const shadow = this.shadowRoot;

            const client_id = this.hasAttribute('client-id') ? this.getAttribute('client-id') : '';

            shadow.querySelector('button.btn-save').addEventListener('click', function(e) {
                console.log('//TODO btn-save');
            });

            tabs(shadow);
        }
    }

    _getClientId() {
        const shadow = this.shadowRoot;

        const client = shadow.getElementById('client_id');
        return client.value;
    }

    _getItemId() {
        const shadow = this.shadowRoot;

        const item = shadow.getElementById('item_id');
        return item.value;
    }

    _init(container) {
        const self = this;

        const client_id = this.getAttribute('client-id');
        const item_id = this.getAttribute('item-id');

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="form-wrapper">
                <div class="toolbar" role="toolbar">
                    <button type="button" class="btn btn-save" title="Save" tabindex="0">
                        <span class="material-icons">save</span>
                    </button>
                </div><!-- .toolbar -->
                <form class="form-item-editor" role="tabs">
                    <input type="hidden" id="client_id" name="client_id" value="${client_id}" />
                    <input type="hidden" id="item_id" name="item_id" value="${item_id}" />

                    <ul class="tablist" role="tablist">
                        <li class="tab-item"><a title="General" href="#" role="tab" aria-controls="general">General</a></li>
                        <li class="tab-item"><a title="Substitutes" href="#" role="tab" aria-controls="substitutes">Substitutes</a></li>
                        <li class="tab-item"><a title="Components" href="#" role="tab" aria-controls="components">Components</a></li>
                    </ul><!-- .tab-links -->

                    <div id="general" class="tab-panel active" role="tabpanel">
                        <div class="tab-panel-content">
                            <!-- name -->
                            <label for="name">Name</label>
                            <div class="form-group form-group-name">
                                <input type="text" id="name" name="name" class="form-input form-input-text" title="Name" placeholder="Name" />
                                <span class="help-text">Item name</span>
                            </div><!-- .form-group -->

                            <!-- description -->
                            <label for="description">Description</label>
                            <div class="form-group form-group-description">
                                <textarea id="description" name="description" class="form-input form-input-textarea" title="Description" placeholder="Description"></textarea>
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

                            <!-- make -->
                            <label for="make">Make</label>
                            <div class="form-group form-group-make">
                                <input type="text" id="make" name="make" class="form-input form-input-make" title="Make" placeholder="Make" />
                            </div><!-- .form-group -->

                            <!-- model -->
                            <label for="model">Model</label>
                            <div class="form-group form-group-model">
                                <input type="text" id="model" name="model" class="form-input form-input-model" title="Model" placeholder="Model" />
                            </div><!-- .form-group -->

                            <!-- brand -->
                            <label for="brand">Brand</label>
                            <div class="form-group form-group-brand">
                                <input type="text" id="brand" name="brand" class="form-input form-input-brand" title="Brand" placeholder="Brand" />
                            </div><!-- .form-group -->

                            <!-- version -->
                            <label for="version">version</label>
                            <div class="form-group form-group-version">
                                <input type="text" id="version" name="version" class="form-input form-input-version" title="Version" placeholder="Version" />
                            </div><!-- .form-group -->

                            <h4 class="divider">Physical Characteristics</h4>

                            <!-- length -->
                            <label for="length">Length</label>
                            <div class="form-group form-group-length">
                                <input type="number" id="length" name="length" class="form-input form-input-length" title="Length" placeholder="Length" />
                            </div><!-- .form-group -->

                            <!-- width -->
                            <label for="width">Width</label>
                            <div class="form-group form-group-width">
                                <input type="number" id="width" name="width" class="form-input form-input-width" title="Width" placeholder="Width" />
                            </div><!-- .form-group -->

                            <!-- height -->
                            <label for="height">Height</label>
                            <div class="form-group form-group-height">
                                <input type="number" id="height" name="height" class="form-input form-input-height" title="Height" placeholder="Height" />
                            </div><!-- .form-group -->

                            <!-- weight -->
                            <label for="weight">Weight</label>
                            <div class="form-group form-group-weight">
                                <input type="number" id="weight" name="weight" class="form-input form-input-weight" title="Weight" placeholder="Weight" />
                            </div><!-- .form-group -->
                        </div><!-- .tab-panel-content -->
                    </div><!-- .tab-panel -->

                    <div id="substitutes" class="tab-panel" role="tabpanel">
                        <div class="tab-panel-content">
                            <items-table hide-description hide-quantity></items-table>
                        </div><!-- .tab-panel-content -->
                    </div><!-- .tab-panel -->

                    <div id="components" class="tab-panel" role="tabpanel">
                        <div class="tab-panel-content">
                        <items-table hide-description></items-table>
                        </div><!-- .tab-panel-content -->
                    </div><!-- .tab-panel -->
                </form>
            </div><!-- .form-wrapper -->
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;
    }

    setItem(item = {}) {

    }
}
customElements.define('item-editor', ItemEditor);
export { ItemEditor };