'use strict';

class ItemsTable extends HTMLElement {

    constructor() {
        self = super();

        const div = document.createElement('div');
        div.classList.add('wrapper');

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(div);

        this.setItems = this.setItems.bind(this);
    }

    initTable(component, container) {

    }

    setItems(items, options) {

    }
}
customElements.define('items-table', ItemsTable);
export { ItemsTable };