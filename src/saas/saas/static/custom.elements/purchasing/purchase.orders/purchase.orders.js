'use strict';
import { notify, showInTab } from '/static/js/ui/ui.js';
import { PurchaseOrders } from '/static/js/modules/purchasing/purchase_orders.js';
class PurchaseOrdersElement extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/inventory/warehouse.selector/warehouse.selector.css');

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
        this.setPurchaseOrders = this.setPurchaseOrders.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const client_id = this.getAttribute('client-id');

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button id="btn-new-po" type="button" class="btn btn-new" title="New Purchase Order">
                    <span class="material-icons">playlist_add</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form class="form-po-filter">
                    <input type="hidden" id="client-id" name="client_id" value="${client_id}" />

                    <label for="filter">Purchase Orders</label>
                    <input type="search" id="filter" name="filter" title="Purchase Order" placeholder="Purchase Order" />
                    <button type="button" id="btn-filter" class="btn btn-filter" title="Search">
                        <span class="material-icons">search</span>
                    </button>
                </form>
            </div><!-- .form-wrapper -->
            <div class="table-wrapper">
                <table class="tbl-po">
                    <caption>Purchase Orders</caption>
                    <colgroup>
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Date</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    <tfoot>
                    </tfoot>
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
            PurchaseOrders.filter(client_id, filter).then((r) => {
                if (r.status == 'success') {
                    self.setPurchaseOrders(r.json.purchaseOrders, filter);
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

        const btnnew = shadow.getElementById('btn-new-po');
        btnnew.addEventListener('click', function(e) {
            showInTab('purchase-order', 'New Purchase Order', `<purchase-order client-id="${client_id}"></purchase-order>`);
        });
    }

    setPurchaseOrders(orders = [], filter = '') {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = self._getClientId();

        const tbody = shadow.querySelector('table.tbl-po tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        orders.forEach((o) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><a class="link-edit-po" title="Edit" href="#" data-id="${o.id}"><span class="material-icons">edit</span></a></td>
                <td>${dayjs(o.created).format('MM/DD/YYYY')}</td>
                <td>${o.description}</td>
            `;
            tbody.appendChild(tr);

            // event handlers
            const edit = tr.querySelector('.link-edit-po');
            edit.addEventListener('click', function(e) {
                e.preventDefault();
                const po_id = edit.dataset.id;
                showInTab('purchase-order', 'Purchase Order', `<purchase-order client-id="${client_id}" po-id="${po_id}"></purchase-order>`);
            });
        });
    }
}
customElements.define('purchase-orders', PurchaseOrdersElement);