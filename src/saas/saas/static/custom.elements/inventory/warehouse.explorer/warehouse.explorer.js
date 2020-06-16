'use strict';
import { notify, showInTab } from '/static/js/ui/ui.js';
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
                    <button type="button" class="btn btn-search" title="Search">
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
                            <th></th>
                            <th>Name</th>
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

        const btnnew = shadow.getElementById('btn-new');
        btnnew.addEventListener('click', function(e) {
            showInTab('warehouse-editor', 'New Warehouse', `<warehouse-editor client-id="${client_id}"></warehouse-editor>`);
        });
    }
}
customElements.define('warehouse-explorer', WarehouseExplorer);
export { WarehouseExplorer };