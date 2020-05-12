'use strict';

class ItemsTable extends HTMLElement {

    constructor() {
        self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/css/inventory/items.table.css');

        const div = document.createElement('div');
        div.classList.add('wrapper');

        this.initTable(self, div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(div);

        this.setOptions = this.setOptions.bind(this);
        this.setItems = this.setItems.bind(this);
    }

    initTable(component, container) {
        const classSKU = component.hasAttribute('hide-sku') ? 'col-sku col-hidden' : 'col-sku';
        const classUPC = component.hasAttribute('hide-upc') ? 'col-upc col-hidden' : 'col-upc';
        const classQTY = component.hasAttribute('hide-qty') ? 'col-qty col-hidden' : 'col-qty';
        const classOUM = component.hasAttribute('hide-uom') ? 'col-uom col-hidden' : 'col-uom';

        const div = document.createElement('div');
        div.classList.add('tbl-wrapper');
        div.innerHTML = `
            <form class="form-items">
                <table class="tbl-items">
                    <caption>Items</caption>
                    <thead>
                        <tr>
                            <th class="col-select"></th>
                            <th class="col-name">Name</th>
                            <th class="col-description">Description</th>
                            <th class="${classSKU}">SKU</th>
                            <th class="${classUPC}">UPC</th>
                            <th class="${classQTY}">Quantity</th>
                            <th class="${classOUM}">Unit</th>
                        </tr>
                        <tr class="row-filter">
                            <th class="col-select"></th>
                            <th class="col-name" colspan="2">
                                <input type="search" id="nameFilter" name="nameFilter" class="form-input-search form-name" title="Filter Item Name" placeholder="Item Name"/>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </form>
        `;

        container.appendChild(div);

        const tSearch = div.querySelector('input#nameFilter');
        tSearch.addEventListener('input', function(e) {
            component.dispatchEvent(new CustomEvent('onfilteritems', {
                bubbles: true,
                cancelable: true,
                detail: tSearch.value
            }));
        });
    }

    setOptions(options) {
        const self = this;
        const shadow = this.shadowRoot;
        this.options = options;

        const tbl = shadow.querySelector('table.tbl-items');
        if (options && options.hideQuantityColumn == true) {
            tbl.classList.add('hide-quantity');
        }

        const tbody = shadow.querySelector('table.tbl-items tbody');
        let aAdd = tbody.querySelector("a#itemAdd");
        if (aAdd == null) {
            const tr = document.createElement('tr');
            tr.classList.add('item-add');
            tr.innerHTML = `
                <td colspan="2">
                    <a id="itemAdd" class="nav-link item-add-link" title="Add Item" href="#">Add</a>
                </td>
            `;
            tbody.appendChild(tr);

            aAdd = tbody.querySelector('a#itemAdd');
            aAdd.addEventListener('click', function(e) {
                self.dispatchEvent(new CustomEvent('onadditem', {
                    bubbles: true,
                    cancelable: true
                }));
            });
        }
    }

    setItems(items, filter) {
        const self = this;
        const options = this.options;
        const shadow = this.shadowRoot;
        if (Array.isArray(items)) {
            const showAdd = this.hasAttribute('show-add');
            const multiselect = this.hasAttribute('multiselect');
            const classSKU = this.hasAttribute('hide-sku') ? 'col-sku col-hidden' : 'col-sku';
            const classUPC = this.hasAttribute('hide-sku') ? 'col-upc col-hidden' : 'col-upc';
            const classQTY = this.hasAttribute('hide-qty') ? 'col-qty col-hidden' : 'col-qty';
            const classUOM = this.hasAttribute('hide-uom') ? 'col-uom col-hidden' : 'col-uom';

            const tbl = shadow.querySelector('table.tbl-items');
            const tbody = tbl.querySelector('tbody');
            while(tbody.firstChild) {
                tbody.removeChild(tbody.lastChild);
            } 

            items.forEach(item => {
                const tr = document.createElement('tr');
                tr.classList.add('item-row');


                let item_name = item.name;
                if (filter != '') {
                    item_name = item_name.replace(filter, `<strong>${filter}</strong>`);
                }

                let tds = [];

                if (multiselect) {
                    tds.push(`<td class="col-select"><input type="checkbox" name="selectItem" title="Select Item" class="form-input-check form-item" value="${item.id}" /></td>`);
                } else {
                    tds.push(`<td class="col-select"><input type="radio" name="selectItem" title="Select Item" class="form-input-check form-item" value="${item.id}" /></td>`);
                }

                tds.push(`<td class="col-name">${item_name}</td>`);
                tds.push(`<td class="col-description">${item.description}</td>`);
                tds.push(`<td class="${classSKU}">${item.sku}</td>`);
                tds.push(`<td class="${classUPC}">${item.upc}</td>`);
                tds.push(`<td class="${classQTY}"></td>`);
                tds.push(`<td class="${classUOM}"></td>`);

                tr.innerHTML = tds.join('');
                
                tbody.appendChild(tr);
            });

            if (showAdd) {
                const tr = document.createElement('tr');
                tr.classList.add('item-add');
                tr.innerHTML = `
                    <td colspan="6">
                        <a id="itemAdd" class="nav-link item-add-link" title="Add Item" href="#">Add</a>
                    </td>
                `;
                tbody.appendChild(tr);

                const itemAdd = tr.querySelector('a#itemAdd');
                itemAdd.addEventListener('click', function(e) {
                    self.dispatchEvent(new CustomEvent('onadditem', {
                        bubbles: true,
                        cancelable: true
                    }));
                });
            }
        } else {
            self.dispatchEvent(new CustomEvent('error', {
                bubbles: true,
                cancelable: true,
                detail: "Expecting an array of items"
            }));
        }
    }
}
customElements.define('items-table', ItemsTable);
export { ItemsTable };