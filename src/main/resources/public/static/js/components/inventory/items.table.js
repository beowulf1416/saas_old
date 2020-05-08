'use strict';

class ItemsTable extends HTMLElement {

    constructor() {
        self = super();

        const div = document.createElement('div');
        div.classList.add('wrapper');

        this.initTable(self, div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(div);

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
                        </tr>
                        <tr class="row-filter">
                            <th class="col-select">
                            </th>
                            <th class="col-name">
                                <input type="search" id="nameFilter" name="nameFilter" class="form-input-search form-name" title="Filter Item Name" />
                            </th>
                        </tr>
                    </thead>
                </table>
            </form>
        `;

        container.appendChild(div);

        const tSearch = div.querySelector('input#nameFilter');
        tSearch.addEventListener('input', new CustomEvent('onfilteritems', {
            bubbles: true,
            cancelable: true,
            detail: tSearch.value
        }));
    }

    setItems(items, options) {
        const self = this;
        if (Array.isArray(items)) {

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