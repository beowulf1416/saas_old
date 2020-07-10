'use strict';
import { showInView, notify } from '/static/js/ui/ui.js';
import { InventoryWarehouse } from '/static/js/modules/inventory/warehouses.js';
class WarehouseSelector extends HTMLElement {

    static get observedAttributes() { return ['warehouse-id']; }

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/inventory/warehouse-selector/warehouse-selector.css');

        const google_web_fonts = document.createElement("link");
        google_web_fonts.setAttribute('rel', 'stylesheet');
        google_web_fonts.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this._init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(google_web_fonts);
        shadow.appendChild(div);

        this._attachEventHandlers = this._attachEventHandlers.bind(this);
        this.getWarehouseId = this.getWarehouseId.bind(this);
        this._setWarehouse = this._setWarehouse.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const client_id = this.getAttribute('client-id');
        const show_address = this.hasAttribute('show-address');

        const address = this.hasAttribute('show-address') ? `
            <label for="address">Address</label>
            <textarea id="address" name="address" title="Warehouse Address" readonly></textarea>
        ` : '';

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <form class="form-warehouse">
                <input type="hidden" id="client-id" name="client_id" value="${client_id}" />
                <input type="hidden" id="warehouse-id" name="warehouse_id" value="" />

                <input type="text" id="selector" name="selector" class="form-input-selector" placeholder="Select Warehouse" readonly />
                <button id="btn-warehouse" type="button" class="btn" title="Select Warehouse">...</button>

                ${address}
            </form>
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client = shadow.getElementById('client-id');
        const client_id = client.value;

        const warehouse = shadow.getElementById('warehouse-id');

        const btnwarehouse = shadow.getElementById('btn-warehouse');
        btnwarehouse.addEventListener('click', function(e) {
            const view = showInView('Warehouse Selector', `<warehouse-selector-view client-id="${client_id}"></warehouse-selector-view>`);
            view.addEventListener('selected', function(e) {
                const warehouseId = e.detail.warehouseId;
                warehouse.value = warehouseId;
                InventoryWarehouse.get(client_id, warehouseId).then((r) => {
                    if (r.status == 'success') {
                        const warehouse = r.json.warehouse;
                        // const selector = shadow.getElementById('selector');

                        // selector.value = warehouse.name;
                        self._setWarehouse(warehouse);
                    } else {
                        notify(r.status, r.message);
                    }
                });
            });
        });
    }

    getWarehouseId() {
        const self = this;
        const shadow = this.shadowRoot;
        const warehouse = shadow.getElementById('warehouse-id');
        return warehouse.value;
    }

    _setWarehouse(w = {}) {
        const self = this;
        const shadow = this.shadowRoot;

        const selector = shadow.getElementById('selector');
        selector.value = w.name;

        const input_warehouse = shadow.getElementById('warehouse-id');
        input_warehouse.value = w.id;

        const input_address = shadow.getElementById('address');
        if (input_address) {
            input_address.value = w.address;
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const self = this;

        if (name == 'warehouse-id') {
            const client_id = this.getAttribute('client-id');
            InventoryWarehouse.get(client_id, newValue).then((r) => {
                if (r.status == 'success') {
                    const warehouse = r.json.warehouse;
                    self._setWarehouse(warehouse);
                } else {
                    notify(r.status, r.message);
                }
            });
        }
    }
}
customElements.define('warehouse-selector', WarehouseSelector);