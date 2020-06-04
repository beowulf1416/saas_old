'use strict';

class ItemsTable extends HTMLElement {

    constructor() {
        const self = super();

        const bulma = document.createElement("link");
        bulma.setAttribute('rel', 'stylesheet');
        bulma.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bulma@0.8.2/css/bulma.min.css');

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/css/inventory/items.table.css');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this.init(self, div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(bulma);
        shadow.appendChild(style);
        shadow.appendChild(div);

        this.setItems = this.setItems.bind(this);
        this.getItems = this.getItems.bind(this);
    }

    init(component, container) {
        const caption = this.hasAttribute('caption') ? this.getAttribute('caption') : 'Items';
        const hide_description = this.hasAttribute('hide-description');
        const hide_qty = this.hasAttribute('hide-quantity');
        const show_add = this.hasAttribute('show-add');

        const ths = [];
        const colgroups = [];
        ths.push(`<th class="col-select"></th>`);
        colgroups.push('<col class="col-select">');

        ths.push(`<th class="col-name"><span>Name</span></th>`);
        colgroups.push('<col class="col-name">');

        if (!hide_description) {
            ths.push(`<th class="col-description"><span>Description</span></th>`);
            colgroups.push('<col class="col-description">');
        }
        if (!hide_qty) {
            ths.push(`<th class="col-qty"><span>Quantity</span></th>`);
            colgroups.push('<col class="col-qty">');

            ths.push(`<th class="col-uom"><span>UOM</span></th>`);
            colgroups.push('<col class="col-uom">');
        }
        const thall = ths.join('');
        const colgroupsall = colgroups.join('');

        const footers = [];
        if (show_add) {
            footers.push('<td><a id="addItem" class="link-add" title="Add Item" href="#addItem">&plus;</a></td>');
        }
        footers.push('<td><input type="text" id="itemName" class="form-input-name" title="Item Name" placeholder="Item Name" /></td>');
        if (!hide_description) {
            footers.push('<td></td>');
        }
        if (!hide_qty) {
            footers.push('<td><input type="number" id="itemQty" class="form-input-qty" title="Quantity" /></td>');
            footers.push('<td><input type="text" id="itemUOM" class="form-input-uom" title="Unit of Measure" /></td>');
        }
        const footersall = footers.join('');

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="table-wrapper">
                <table class="tbl-items" role="table">
                    <caption>${caption}</caption>
                    <colgroup>
                        ${colgroupsall}
                    </colgroup>
                    <thead>
                        ${thall}
                    </thead>
                    <tbody>
                    </tbody>
                    <tfoot>
                        <tr>
                            ${footersall}
                        </tr>
                    </tfoot>
                </table>
            </div><!-- .table-wrapper -->
        `;

        container.appendChild(div);
    }

    setItems(items = [], filter = '') {
        const self = this;
        const shadow = this.shadowRoot;

        const hide_description = this.hasAttribute('hide-description');
        const hide_qty = this.hasAttribute('hide-quantity');

        const tbody = shadow.querySelector('table.tbl-items tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        items.forEach(item => {
            let item_name = item.name;
            let item_desc = item.description;
            if (filter != '') {
                item_name = item_name.replace(filter, `<strong>${filter}</strong>`);
                item_desc = item_desc.replace(filter, `<strong>${filter}<strong>`);
            }

            const tds = [];
            tds.push(`<td class="col-select" role="gridcell"><input type="radio" id="id${item.id}" name="selected" title="Select Item" value="${item.id}" /></td>`);
            tds.push(`<td class="col-name" role="gridcell"><span>${item_name}</span></td>`);
            if (!hide_description) {
                tds.push(`<td class="col-description" role="gridcell">${item_desc}</td>`);
            }
            if (!hide_qty) {
                tds.push(`<td class="col-qty" role="gridcell" data-qty="${item.quantity}">${item.quantity}</td>`);
                tds.push(`<td class="col-uom" role="gridcell" data-uom="${item.uom}">${item.uom}</td>`);
            }
            const tdall = tds.join('');

            const tr = document.createElement('tr');
            tr.classList.add('row-item');
            tr.setAttribute('role', 'row');
            tr.setAttribute('data-itemid', item.id);
            tr.innerHTML = `
                ${tdall}
            `;

            tbody.appendChild(tr);
        });
    }

    getItems() {
        const self = this;
        const shadow = this.shadowRoot;

        const hide_description = this.hasAttribute('hide-description');
        const hide_qty = this.hasAttribute('hide-quantity');

        const items = [];
        shadow.querySelectorAll('table.tbl-items tbody').forEach(tr => {
            const itemId = tr.dataset.itemid;
            const qty = hide_qty ? 0 : tr.querySelector('td.col-qty').dataset.qty;
            const uom = hide_qty ? '' : tr.querySelector('td.col-uom').dataset.uom;

            items.push({
                id: itemId,
                quantity: qty,
                uom: uom
            });
        });
        return items;
    }
}
customElements.define('items-table', ItemsTable);
export { ItemsTable };