'use strict';
import { notify } from '/static/js/ui/ui.js';
import { PurchaseOrders } from '/static/js/modules/purchasing/purchase_orders.js';
class PurchaseOrderSelectorView extends HTMLElement {

    constructor() {
        const self = super();
        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/purchasing/purchase-order-selector/purchase-order-selector-view.css');

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
        this.setPurchaseOrders = this.setPurchaseOrders.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="form-wrapper">
                <form id="form-po-selector">
                    <label for="filter">Purchase Order</label>
                    <input type="search" id="filter" name="filter" class="form-input-filter" title="Purchase Order Filter" placeholder="Search" />
                    <button type="button" id="btn-filter" class="btn btn-filter" title="Search">
                        <span class="material-icons">search</span>
                    </button>
                </form>
            </div><!-- .form-wrapper -->
            <div class="table-wrapper">
                <table id="tbl-orders">
                    <caption>Purchase Orders</caption>
                    <colgroup>
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div><!-- .table-wrapper -->
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        const beginsearch = function(filter) {
            PurchaseOrders.filter(client_id, filter).then((r) => {
                if (r.status == 'success') {
                    self.setPurchaseOrders(r.json.purchaseOrders, filter);
                } else {
                    notify(r.status, r.message);
                }
            });
        };
    }

    setPurchaseOrders(orders = [], filter = '') {
        const self = this;
        const shadow = this.shadowRoot;

        const tbody = shadow.querySelector('table#tbl-orders tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        orders.forEach((po) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <input type="radio" name="selected" class="form-input-selected" title="Select Purchase Order" value="${po.id}" />
                </td>
                <td></td>
            `;

            tbody.appendChild(tr);
        });

        // event handlers
    }
}
customElements.define('purchase-order-selector-view', PurchaseOrderSelectorView);