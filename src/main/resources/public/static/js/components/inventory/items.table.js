'use strict';

class ItemsTable extends HTMLElement {

    constructor() {
        self = super();

        const div = document.createElement('div');
        div.classList.add('wrapper');

        this.initTable(self, div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(div);

        this.setOptions = this.setOptions.bind(this);
        this.setItems = this.setItems.bind(this);
    }

    initTable(component, container) {
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

                if (options && options.multiselect == true) {
                    tds.push(`<td class="col-select"><input type="checkbox" name="selectItem" title="Select Item" class="form-input-check form-item" value="${item.id}" /></td>`);
                } else {
                    tds.push(`<td class="col-select"><input type="radio" name="selectItem" title="Select Item" class="form-input-check form-item" value="${item.id}" /></td>`);
                }

                tds.push(`<td class="col-name">${item_name}</td>`);
                tds.push(`<td class="col-description">${item.description}</td>`);
                tds.push(`<td class="col-sku">${item.sku}</td>`);
                tds.push(`<td class="col-upc">${item.upc}</td>`);
                tds.push(`<td class="col-qty"></td>`);

                tr.innerHTML = tds.join('');
                
                tbody.appendChild(tr);
            });

            if (options && options.allowAdd == true) {
                const tr = document.createElement('tr');
                tr.classList.add('item-add');
                tr.innerHTML = `
                    <td colspan="3">
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