'use strict';
import { showInView } from '/static/js/ui/ui.js';
import { PurchaseOrders } from '/static/js/modules/purchasing/purchase_orders.js';
class PurchaseOrderSelector extends HTMLElement {

    constructor() {
        const self = super();
        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/purchasing/purchase-order-selector/purchase-order-selector.css');

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
        this.setPurchaseOrder = this.setPurchaseOrder.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const client_id = this.getAttribute('client-id');

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <input type="hidden" id="purchase-order-id" name="purchase_order_id" value="" />

            <input type="text" id="purchase-order-ref" name="purchase_order_ref" value="" title="Purchase Order Reference" placeholder="Purchase Order Reference" readonly />
            <button type="button" id="btn-select" class="btn btn-select" title="Select Purchase Order">...</button>
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        const btnselect = shadow.getElementById('btn-select');
        btnselect.addEventListener('click', function(e) {
            const selector = showInView('Purchase Order Selector', `<purchase-order-selector-view client-id="${client_id}"></purchase-order-selector-view>`)
            selector.addEventListener('selected', function(e) {
                const purchaseOrderId = e.detail.purchaseOrderId;

                PurchaseOrders.get(client_id, purchaseOrderId).then((r) => {
                    if (r.status == 'success') {
                        const order = r.json.purchaseOrder;
                        self.setPurchaseOrder(order);
                    } else {
                        notify(r.status, r.message);
                    }
                });
            });
        });
    }

    setPurchaseOrder(order = {}) {
        const self = this;
        const shadow = this.shadowRoot;

        const input_id = shadow.getElementById('purchase-order-id');
        input_id.value = order.id;

        const input_ref = shadow.getElementById('purchase-order-ref');
        input_ref.value = order.description;

        self.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            cancelable: true,
            detail: {
                order: order
            }
        }));
    }
}
customElements.define('purchase-order-selector', PurchaseOrderSelector);