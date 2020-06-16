'use strict';
import { notify, showInTab } from '/static/js/ui/ui.js';
import { InventoryWarehouse } from '/static/js/modules/inventory/warehouses.js';
class WarehouseExplorer extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/inventory/warehouse.explorer/warehouse.explorer.css');

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
        this.addWarehouses = this.addWarehouses.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const client_id = this.getAttribute('client-id');

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button id="btn-new" type="button" class="btn btn-new" title="New Warehouse">
                    <span class="material-icons">home_work</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form class="form-warehouse-filter">
                    <input type="hidden" id="client-id" name="client_id" value="${client_id}" />

                    <!-- .filter -->
                    <label for="filter">Warehouse</label>
                    <input type="search" id="filter" name="filter" class="form-input-search" title="Search for Warehouse" />
                    <button id="btn-search" type="button" class="btn btn-search" title="Search">
                        <span class="material-icons">search</span>
                    </button>
                </form>
            </div><!-- .form-wrapper -->
            <div class="table-wrapper">
                <table class="tbl-warehouses">
                    <caption>Warehouses</caption>
                    <colgroup>
                        <col class="col-edit">
                        <col class="col-name">
                        <col class="col-address">
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th scope="col">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    <tfooter>
                    </tfooter>
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

        const client_id = self._getClientId();

        const beginsearch = function(filter) {
            InventoryWarehouse.filter(client_id, filter).then((r) => {
                if (r.status == 'success') {
                    self.addWarehouses(r.json.warehouses, filter);
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

        const btnsearch = shadow.getElementById('btn-search');
        btnsearch.addEventListener('click', function(e) {
            beginsearch(filter.value);
        });

        const btnnew = shadow.getElementById('btn-new');
        btnnew.addEventListener('click', function(e) {
            showInTab('warehouse-editor', 'New Warehouse', `<warehouse-editor client-id="${client_id}"></warehouse-editor>`);
        });
    }

    addWarehouses(warehouses = [], filter = '') {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = self._getClientId();

        const tbody = shadow.querySelector('table.tbl-warehouses tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        warehouses.forEach((w) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <a class="link-edit-warehouse" title="Edit Warehouse" href="#" data-name="${w.name}" data-id="${w.id}">
                        <span class="material-icons">edit</span>
                    </a>
                </td>
                <td>${w.name}</td>
                <td>${w.address}</td>
            `;

            tbody.appendChild(tr);

            // event handlers
            const edit = tr.querySelector('.link-edit-warehouse');
            edit.addEventListener('click', function(e) {
                e.preventDefault();

                const id = edit.dataset.id;
                const name = edit.dataset.name;
                showInTab('warehouse-editor', `Warehouse ${name}`, 
                    `<warehouse-editor client-id="${client_id}" warehouse-id="${id}"></warehouse-editor>`);
            });
        });
    }
}
customElements.define('warehouse-explorer', WarehouseExplorer);
export { WarehouseExplorer };