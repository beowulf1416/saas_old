'use strict';

class ReceivingEditor extends HTMLElement {

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
        this.setItems = this.setItems.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const client_id = this.getAttribute('client-id');

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="form-wrapper">
                <form class="form-receiving">
                    <input type="hidden" id="client-id" name="client_id" value="${client_id}" />

                    <fieldset>
                        <legend>Purchase Order</legend>
                        <purchase-order-selector client-id="${client_id}"></purchase-order-selector>
                    </fieldset>

                    <div class="table-wrapper">
                        <table id="tbl-items">
                            <caption>Items</caption>
                            <colgroup>
                            </colgroup>
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Unit</th>
                                    <th scope="col">Item</th>
                                    <th scope="col">Actual Quantity</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <td><a id="link-add-item" class="link-add-item" href="#" title="Add Item">&plus;</a></td>
                                </tr>
                            </tfoot>
                            <tbody>
                            </tbody>
                        </table>
                    </div><!-- .table-wrapper -->
                </form>
            </div><!-- .form-wrapper -->
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const selector = shadow.querySelector('purchase-order-selector');
        selector.addEventListener('change', function(e) {
            const order = e.detail.order;

            self.setItems(order.items);
        });

        const additem = shadow.getElementById('link-add-item');
        additem.addEventListener('click', function(e) {
            e.preventDefault();

            console.log('//TODO');
        });
    }

    setItems(items = []) {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        const tbody = shadow.querySelector('table#tbl-items tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        items.forEach((item) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><a class="link-remove-item" href="#" title="Remove Item">&minus;</a></td>
                <td>${item.description}</td>
                <td>${item.quantity}</td>
                <td>${item.unit_id}</td>
                <td><item-selector client-id="${client_id}"></item-selector></td>
                <td></td>
            `;

            tbody.appendChild(tr);
        });
    }
}
customElements.define('receiving-editor', ReceivingEditor);