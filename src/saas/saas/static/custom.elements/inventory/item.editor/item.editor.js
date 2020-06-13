'use strict';
import { Inventory } from '/static/js/modules/inventory/inventory.js';
import { InventoryItem } from '/static/js/modules/inventory/items.js';
import { ItemsTable } from '/static/custom.elements/inventory/items.table/items.table.js';

import { tabs } from '/static/js/ui/tabs.js';
import { notify, showInView } from '/static/js/ui/ui.js';

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

        this._fetchData = this._fetchData.bind(this);
        this._attachEventHandlers = this._attachEventHandlers.bind(this);
        this._getClientId = this._getClientId.bind(this);
        this._getItemId = this._getItemId.bind(this);
        this.setItem = this.setItem.bind(this);

        this._fetchData();

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
        const item_id = this.hasAttribute('item-id') ? this.getAttribute('item-id') : '';

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
                            <div class="form-group form-group-dimension form-group-length">
                                <input type="number" id="length" name="length" class="form-input form-input-length" title="Length" placeholder="Length" />
                                <select id="length-unit" name="length_unit" title="Unit of Measure">
                                </select>
                            </div><!-- .form-group -->

                            <!-- width -->
                            <label for="width">Width</label>
                            <div class="form-group form-group-dimension form-group-width">
                                <input type="number" id="width" name="width" class="form-input form-input-width" title="Width" placeholder="Width" />
                                <select id="width-unit" name="width_unit" title="Unit of Measure">
                                </select>
                            </div><!-- .form-group -->

                            <!-- height -->
                            <label for="height">Height</label>
                            <div class="form-group form-group-dimension form-group-height">
                                <input type="number" id="height" name="height" class="form-input form-input-height" title="Height" placeholder="Height" />
                                <select id="height-unit" name="height_unit" title="Unit of Measure">
                                </select>
                            </div><!-- .form-group -->

                            <!-- weight -->
                            <label for="weight">Weight</label>
                            <div class="form-group form-group-dimension form-group-weight">
                                <input type="number" id="weight" name="weight" class="form-input form-input-weight" title="Weight" placeholder="Weight" />
                                <select id="weight-unit" name="weight_unit" title="Unit of Measure">
                                </select>
                            </div><!-- .form-group -->
                        </div><!-- .tab-panel-content -->
                    </div><!-- .tab-panel -->

                    <div id="substitutes" class="tab-panel" role="tabpanel">
                        <div class="tab-panel-content">
                            <items-table id="item-substitutes" show-add hide-description hide-quantity></items-table>
                        </div><!-- .tab-panel-content -->
                    </div><!-- .tab-panel -->

                    <div id="components" class="tab-panel" role="tabpanel">
                        <div class="tab-panel-content">
                            <items-table id="item-components" show-add hide-description hide-quantity></items-table>
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

        const client_id = self._getClientId();
        const item_id = self._getItemId();

        const btnsave = shadow.querySelector('button.btn-save');
        btnsave.addEventListener('click', function(e) {
            const input_name = shadow.getElementById('name');
            const input_desc = shadow.getElementById('description');
            const input_sku = shadow.getElementById('sku');
            const input_upc = shadow.getElementById('upc');
            const input_make = shadow.getElementById('make');
            const input_model = shadow.getElementById('model');
            const input_brand = shadow.getElementById('brand');
            const input_version = shadow.getElementById('version');

            const input_length = shadow.getElementById('length');
            const input_length_unit = shadow.getElementById('length-unit');
            const input_width = shadow.getElementById('width');
            const input_width_unit = shadow.getElementById('width-unit');
            const input_height = shadow.getElementById('height');
            const input_height_unit = shadow.getElementById('height-unit');
            const input_weight = shadow.getElementById('weight');
            const input_weight_unit = shadow.getElementById('weight-unit');

            const substitutes = shadow.getElementById('item-substitutes');
            const components = shadow.getElementById('item-components');

            if (client_id && item_id) {
                InventoryItem.update({
                    clientId: client_id,
                    itemId: item_id,
                    name: input_name.value,
                    description: input_desc.value,
                    sku: input_sku.value,
                    upc: input_upc.value,
                    make: input_make.value,
                    model: input_model.value,
                    brand: input_brand.value,
                    version: input_version.value,
                    length: parseInt(input_length.value),
                    lengthUnitId: parseInt(input_length_unit.value),
                    width: parseInt(input_width.value),
                    widthUnitId: parseInt(input_width_unit.value),
                    height: parseInt(input_height.value),
                    heightUnitId: parseInt(input_height_unit.value),
                    weight: parseInt(input_weight.value),
                    weightUnitId: parseInt(input_weight_unit.value),
                    substitutes: substitutes.getItems(),
                    components: components.getItems()
                }).then((r) => {
                    if (r.status == 'success') {
                        console.log('//TODO');
                    } else {
                        notify(r.status, r.message);
                    }
                });
            } else {
                InventoryItem.add({
                    clientId: client_id,
                    name: input_name.value,
                    description: input_desc.value,
                    sku: input_sku.value,
                    upc: input_upc.value,
                    make: input_make.value,
                    model: input_model.value,
                    brand: input_brand.value,
                    version: input_version.value,
                    length: parseInt(input_length.value),
                    lengthUnitId: parseInt(input_length_unit.value),
                    width: parseInt(input_width.value),
                    widthUnitId: parseInt(input_width_unit.value),
                    height: parseInt(input_height.value),
                    heightUnitId: parseInt(input_height_unit.value),
                    weight: parseInt(input_weight.value),
                    weightUnitId: parseInt(input_weight_unit.value),,
                    substitutes: substitutes.getItems(),
                    components: components.getItems()
                }).then((r) => {
                    if (r.status == 'success') {
                        notify(r.status, r.message);
                    } else {
                        notify(r.status, r.message);
                    }
                });
            }
        });

        const substitutes = shadow.getElementById('item-substitutes');
        substitutes.addEventListener('addItem', function(e) {
            const selector = showInView('Select Items', `<item-selector client-id="${client_id}"></item-selector>`);
            selector.addEventListener('assign', function(e) {
                console.log("assign substitutes");
                console.log(e);
            });
            e.preventDefault();
        });

        const components = shadow.getElementById('item-components');
        components.addEventListener('addItem', function(e) {
            const selector = showInView('Select Items', `<item-selector client-id="${client_id}"></item-selector>`);
            selector.addEventListener('assign', function(e) {
                console.log("assign components");
                console.log(e);
            });
            e.preventDefault();
        });
    }

    setItem(item = {}) {
        const shadow = this.shadowRoot;

        shadow.getElementById('name').value = item.name;
        shadow.getElementById('description').value = item.description;
        shadow.getElementById('sku').value = item.sku;
        shadow.getElementById('upc').value = item.upc;
        shadow.getElementById('make').value = item.make;
        shadow.getElementById('model').value = item.model;
        shadow.getElementById('brand').value = item.brand;
        shadow.getElementById('version').value = item.version;

        shadow.getElementById('length').value = item.length;
        shadow.getElementById('length-unit').value = item.length_unit_id;
        shadow.getElementById('width').value = item.width;
        shadow.getElementById('width-unit').value = item.width_unit_id;
        shadow.getElementById('height').value = item.height;
        shadow.getElementById('height-unit').value = item.height_unit_id;
        shadow.getElementById('weight').value = item.weight;
        shadow.getElementById('weight-unit').value = item.weight_unit_id;

        const substitutes = shadow.getElementById('item-substitutes');
        sustitutes.setItems(item.substitutes);

        const components = shadow.getElementById('item-components');
        components.setItems(item.components);
    }

    _fetchData() {
        const self = this;
        const shadow = this.shadowRoot;

        Inventory.uoms('length').then((r) => {
            if (r.status == 'success') {
                const length = shadow.getElementById('length-unit');
                const width = shadow.getElementById('width-unit');
                const height = shadow.getElementById('height-unit');

                const l = [];
                const uoms = r.json.uoms;
                uoms.forEach((unit) => {
                    if (unit.symbol) {
                        l.push(`<option value="${unit.id}">${unit.name} (${unit.symbol})</option>`);
                    } else {
                        l.push(`<option value="${unit.id}">${unit.name}</option>`);
                    }
                });

                const loptions = l.join('');

                length.innerHTML = loptions;
                width.innerHTML = loptions;
                height.innerHTML = loptions;
            } else {
                notify(r.status, r.message);
            }
        });

        Inventory.uoms('weight').then((r) => {
            if (r.status == 'success') {
                const weight = shadow.getElementById('weight-unit');
                const uoms = r.json.uoms;
                const o = [];
                uoms.forEach((unit) => {
                    if (unit.symbol) {
                        o.push(`<option value="${unit.id}">${unit.name} (${unit.symbol})</option>`);
                    } else {
                        o.push(`<option value="${unit.id}">${unit.name}</option>`);
                    }
                });
                const woptions = o.join('');

                weight.innerHTML = woptions;
            } else {
                notify(r.status, r.message);
            }
        });

        const item_id = this._getItemId();
        if (item_id != '') {
            InventoryItem.get(item_id).then((r) => {
                if (r.status == 'success') {
                    self.setItem(r.json.item);
                } else {
                    notify(r.status, r.message);
                }
            });
        }
    }
}
customElements.define('item-editor', ItemEditor);
export { ItemEditor };