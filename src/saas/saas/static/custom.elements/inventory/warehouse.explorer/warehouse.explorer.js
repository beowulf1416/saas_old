'use strict';

class WarehouseExplorer extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/inventory/warehouse.explorer/items.explorer.css');

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
    }

    _init(container) {
        const client_id = this.getAttribute('client-id');

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button type="button" class="btn btn-new" title="New Warehouse">
                    <span class="material-icons">new</span>
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
    }
}
customElements.define('warehouse-explorer', WarehouseExplorer);
export { WarehouseExplorer };