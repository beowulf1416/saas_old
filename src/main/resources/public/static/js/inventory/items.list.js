'use strict';

class InventoryItemList extends HTMLElement {

    constructor() {
        self = super();

        const div = document.createElement('div');
        div.classList.add('container');

        this.initItems(self, div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(div);
    }

    initItems(component, container) {
        const div = document.createElement('div');
        div.classList.add('items-wrapper');
        div.innerHTML = `
            <table id="tblItems">
                <caption>Inventory Items</caption>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>SKU</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table><!-- #tblItems -->
        `;

        container.appendChild(div);
    }

    setItems(items) {
        if (Array.isArray(items)) {
            console.log('InventoryItemList::setItems()');
        } else {
            console.error('InventoryItemList::setItems()');
        }
    }
}

customElements.define('inventory-item-list', InventoryItemList);
export { InventoryItemList };