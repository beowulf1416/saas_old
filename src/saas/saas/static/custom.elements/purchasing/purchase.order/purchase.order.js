'use strict';

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
        this._attachEventHandlers = this._attachEventHandlers.bind(this);
    }

    _init(container) {
        const client_id = this.getAttribute('client-id');

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
                            </colgroup>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>UOM</th>
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
                    </div>,!-- .table-wrapper -->
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

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const save = shadow.getElementById('btn-save');
        save.addEventListener('click', function(e) {
            console.log('// TODO');
        });

        const add = shadow.getElementById('link-add-item');
        add.addEventListener('click', function(e) {
            console.log('// TODO');
        });
    }
}
customElements.define('purchase-order', PurchaseOrder);