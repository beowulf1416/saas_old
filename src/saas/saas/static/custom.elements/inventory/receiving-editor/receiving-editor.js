'use strict';

class ReceivingEditor extends HTMLElement {

    constructor() {
        const self = super();
        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/inventory/receiving-editor/receiving-editor.css');

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
            <div class="toolbar" role="toolbar">
                <button type="button" id="btn-save" class="btn btn-save" title="Save">
                    <span class="material-icons">save</span>
                </button>
            </div>
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

        const client_id = this.getAttribute('client-id');

        const btnsave = shadow.getElementById('btn-save');
        btnsave.addEventListener('click', function(e) {
            const trs = shadow.querySelectorAll('table#tbl-items tbody tr');
            trs.forEach((tr) => {
                const id = tr.dataset.id;
                if (tr.classList.contains('po-item')) {
                    const description = tr.querySelector('.item-description').innerText;
                    const unit_id = tr.querySelector('.item-unit').dataset.unitid;
                    const item_id = tr.querySelector('.item-id item-selector').value();
                    const qty = tr.querySelector('.item-actual-qty').innerText;
                } else {
                    console.log('//TODO');
                }
            });


        });

        const selector = shadow.querySelector('purchase-order-selector');
        selector.addEventListener('change', function(e) {
            const order = e.detail.order;

            self._order_id = order.id;
            self.setItems(order.items);
        });

        const additem = shadow.getElementById('link-add-item');
        additem.addEventListener('click', function(e) {
            e.preventDefault();

            const tr = document.createElement('tr');
            tr.classList.add('new');
            tr.dataset.id = uuidv4();
            tr.innerHTML = `
                <td><a class="link-remove-item" href="#" title="Remove Item">&minus;</a></td>
                <td><input type="text" name="description" class="form-input-description" title="Item Description" placeholder="Description" /></td>
                <td><input type="number" name="quantity" class="form-input-quantity" title="Quantity" /></td>
                <td>
                    <select name="unit" class="form-input-unit" title="Unit of Measure">
                    </select>
                </td>
                <td><item-selector client-id="${client_id}"></item-selector></td>
                <td><input type="number" name="quantity" class="form-input-quantity" title="Actual Quantity Received" /></td>
            `;

            const tbody = shadow.querySelector('table#tbl-items tbody');
            tbody.appendChild(tr);

            // event handlers
            const remove = tr.querySelector('.link-remove-item');
            remove.addEventListener('click', function(e) {
                e.preventDefault();

                const parent_tr = remove.parentElement.parentElement;
                tbody.removeChild(parent_tr);
            });
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
            tr.classList.add('po-item');
            tr.dataset.id = item.id;
            tr.innerHTML = `
                <td><a class="link-remove-item" href="#" title="Remove Item">&minus;</a></td>
                <td class="item-description">${item.description}</td>
                <td class="item-qty">${item.quantity}</td>
                <td class="item-unit" data-unitid="${item.unit_id}">${item.unit}</td>
                <td class="item-id"><item-selector client-id="${client_id}"></item-selector></td>
                <td class="item-actual-qty"><input type="number" name="quantity" class="form-input-quantity" title="Actual Quantity Received" /></td>
            `;

            tbody.appendChild(tr);

            // event handlers
            const remove = tr.querySelector('.link-remove-item');
            remove.addEventListener('click', function(e) {
                e.preventDefault();

                const parent_tr = remove.parentElement.parentElement;
                parent_tr.classList.toggle('remove');
            });
        });
    }
}
customElements.define('receiving-editor', ReceivingEditor);