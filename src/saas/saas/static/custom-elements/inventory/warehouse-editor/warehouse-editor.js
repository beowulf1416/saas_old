'use strict';
import { InventoryWarehouse } from '/static/js/modules/inventory/warehouses.js';
import { notify } from '/static/js/ui/ui.js';
class WarehouseEditor extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/inventory/warehouse-editor/warehouse-editor.css');

        const default_style = document.createElement("link");
        default_style.setAttribute('rel', 'stylesheet');
        default_style.setAttribute('href', '/static/css/default.css');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this._init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(default_style);
        shadow.appendChild(div);

        this._getClientId = this._getClientId.bind(this);
        this._getWarehouseId = this._getWarehouseId.bind(this);
        this._attachEventHandlers = this._attachEventHandlers.bind(this);
        this._prefetch = this._prefetch.bind(this);

        this._attachEventHandlers();
        this._prefetch();
    }

    _init(container) {
        const client_id = this.getAttribute('client-id');
        const warehouse_id = this.hasAttribute('warehouse-id') ? this.getAttribute('warehouse-id') : uuidv4();

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button id="btn-save" type="button" class="btn btn-save" title="Save">
                    <span class="material-icons">save</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form class="form-warehouse">
                    <input type="hidden" id="client-id" name="client_id" value="${client_id}" />
                    <input type="hidden" id="warehouse-id" name="warehouse_id" value="${warehouse_id}" />

                    <!-- name -->
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" class="form-input-name" title="Warehouse Name" placeholder="Name" />

                    <!-- address -->
                    <label for="address">Address</label>
                    <textarea id="address" name="address" class="form-input-address" title="Warehouse Address"></textarea>
                </form>
            </div><!-- .form-wrapper -->
        `;

        container.appendChild(div);
    }

    _getClientId() {
        const shadow = this.shadowRoot;
        const client = shadow.getElementById('client-id');
        return client.value;
    }

    _getWarehouseId() {
        const shadow = this.shadowRoot;
        const warehouse = shadow.getElementById('warehouse-id');
        return warehouse.value;
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const btnsave = shadow.getElementById('btn-save');
        btnsave.addEventListener('click', function(e) {
            const client_id = self._getClientId();
            const warehouse_id = self._getWarehouseId();

            const name = shadow.getElementById('name');
            const address = shadow.getElementById('address');
            
            if (this.getAttribute('warehouse-id')) {
                InventoryWarehouse.update(client_id, warehouse_id, name.value, address.value).then((r) => {
                    notify(r.status, r.message);
                });
            } else {
                InventoryWarehouse.add(client_id, warehouse_id, name.value, address.value).then((r) => {
                    notify(r.status, r.message);
                });
            }
        });
    }

    _prefetch() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = self._getClientId();
        const warehouse_id = self._getWarehouseId();
        if (warehouse_id != '' && client_id != '') {
            InventoryWarehouse.get(client_id, warehouse_id).then((r) => {
                if (r.status == 'success') {
                    const warehouse = r.json.warehouse;
                    
                    const name = shadow.getElementById('name');
                    name.value = warehouse.name;

                    const address = shadow.getElementById('address');
                    address.value = warehouse.address;
                } else {
                    notify(r.status, r.message);
                }
            });
        }
    }
}
customElements.define('warehouse-editor', WarehouseEditor);