'use strict';
import { Inventory } from '/static/js/modules/inventory/inventory.js';
class PurchaseOrder extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/purchasing/purchase.order/purchase.order.css');

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

        this._getClientId = this._getClientId.bind(this);
        this._getPOId = this._getPOId.bind(this);
        this._attachEventHandlers = this._attachEventHandlers.bind(this);
        this._prefetch = this._prefetch.bind(this);

        this._attachEventHandlers();
        this._prefetch();
    }

    _init(container) {
        const client_id = this.getAttribute('client-id');
        const po_id = this.hasAttribute('po-id') ? this.getAttribute('po-id') : '';

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button id="btn-save" type="button" class="btn btn-save" title="Save">
                    <span class="material-icons">save</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form class="form-purchase-order">
                    <input type="hidden" id="client-id" name="client_id" value="${client_id}" />
                    <input type="hidden" id="po-id" name="po_id" value="${po_id}" />

                    <!-- date -->
                    <label for="date">Date</label>
                    <input type="date" id="date" name="date" class="form-input-date" />

                    <!-- description -->
                    <label for="description">Description</label>
                    <textarea id="description" name="description" class="form-input-textarea"></textarea>

                    <!-- delivery -->
                    <label for="warehouse">Delivery Instructions</label>
                    <warehouse-selector client-id="${client_id}"></warehouse-selector>

                    <div class="table-wrapper">
                        <table class="tbl-po-items">
                            <caption>Purchase Order Items</caption>
                            <colgroup>
                                <col class="col-remove">
                                <col class="col-description">
                                <col class="col-qty">
                                <col class="col-uom">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">UOM</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                            <tfooter>
                                <tr>
                                    <td>
                                        <a id="link-add-item" class="link-add-item" title="Add Purchase Order Item" href="#">&plus;</a>
                                    </td>
                                </tr>
                            </tfooter>
                        </table>
                    </div><!-- .table-wrapper -->
                </form>
            </div><!-- .form-wrapper -->
        `;

        container.appendChild(div);
    }

    _prefetch() {
        const self = this;

        Inventory.uoms().then((r) => {
            if (r.status == 'success') {
                self._uoms = r.json.uoms;
            } else {
                notify(r.status, r.message);
            }
        });
    }

    _getClientId() {
        const shadow = this.shadowRoot;
        const client = shadow.getElementById('client-id');
        return client.value;
    }

    _getPOId() {
        const shadow = this.shadowRoot;
        const po = shadow.getElementById('po-id');
        return po.value;
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const save = shadow.getElementById('btn-save');
        save.addEventListener('click', function(e) {
            console.log('// TODO');
            const po_id = self._getPOId();
            if (po_id == '') {

            } else {

            }
        });

        const add = shadow.getElementById('link-add-item');
        add.addEventListener('click', function(e) {
            console.log('// TODO');

            const uoms = self._uoms;
            const options = [];
            uoms.forEach((u) => {
                if (u.symbol) {
                    options.push(`<option value="${u.id}">${u.name} (${u.symbol})</option>`);
                } else {
                    options.push(`<option value="${u.id}">${u.name} </option>`);
                }
                
            });
            const optionsall = options.join('');
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><a class="link-remove-item" title="Remove" href="#">&minus;</a></td>
                <td><input type="text" name="description" class="form-input-description" title="Description" placeholder="Description" /></td>
                <td><input type="number" name="quantity" class="form-input-qty" title="Quantity" /></td>
                <td>
                    <select name="uom" class="form-class-uom" title="Unit of Measure">
                        ${optionsall}
                    </select>
                </td>
            `;

            const tbody = shadow.querySelector('table.tbl-po-items tbody');
            tbody.appendChild(tr);

            e.preventDefault();
        });
    }
}
customElements.define('purchase-order', PurchaseOrder);