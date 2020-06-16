'use strict';
import { notify } from '/static/js/ui/ui.js';
import { InventoryWarehouse }  from '/static/js/modules/inventory/warehouses.js';

class WarehouseSelectorView extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/inventory/warehouse.selector/warehouse.selector.view.css');

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
        this._getClientId = this._getClientId.bind(this);
        this.setWarehouses = this.setWarehouses.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const client_id = this.getAttribute('client-id');

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="form-wrapper">
                <form class="form-warehouse-filter">
                    <input type="hidden" id="client-id" name="client_id" value="${client_id}" />

                    <!-- filter -->
                    <label for="filter">Warehouse</label>
                    <input type="search" id="filter" name="filter" class="form-input-filter" />
                    <button id="btn-filter" type="button" class="btn btn-filter" title="Search">
                        <span class="material-icons">search</span>
                    </button>
                </form>
            </div><!-- .form-wrapper -->
            <div class="table-wrapper">
                <table class="tbl-warehouses">
                    <caption>Warehouses</caption>
                    <colgroup>
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div><!-- .table-wrapper -->
        `;

        container.appendChild(div);
    }

    _getClientId() {
        const shadow = this.shadowRoot;
        const client = shadow.getElementById('client-id');

        return client.value;
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this._getClientId();

        const beginsearch = function(filter) {
            InventoryWarehouse.filter(client_id, filter).then((r) => {
                if (r.status == 'success') {
                    self.setWarehouses(r.json.warehouses, filter);
                } else {
                    notify(r.status, r.message);
                }
            });
        };

        const filter = shadow.getElementById('filter');
        filter.addEventListener('keyup', function(e) {
            if (e.keyCode == 13) {
                beginsearch(filter.value);
                e.preventDefault();
            }
        });

        const btnfilter = shadow.getElementById('btn-filter');
        btnfilter.addEventListener('click', function(e) {
            beginsearch(filter.value);
        });
    }

    setWarehouses(warehouses = [], filter = '') {
        const self = this;
        const shadow = this.shadowRoot;

        const tbody = shadow.querySelector('table.tbl-warehouses tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        warehouses.forEach((w) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="radio" id="id${w.id}" name="selected" class="form-input-radio" value="${w.id}" /></td>
                <td><label for="id${w.id}">${w.name}</label></td>
            `;

            tbody.appendChild(tr);

            // event handlers
            const check = tr.querySelector('.form-input-radio');
            check.addEventListener('change', function(e) {
                self.dispatchEvent(new CustomEvent('selected', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        warehouseId: check.value
                    }
                }));
            });
        });
    }
}
customElements.define('warehouse-selector-view', WarehouseSelectorView);