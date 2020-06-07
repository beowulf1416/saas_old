'use strict';
import { InventoryItem } from '/static/js/helpers/inventory/items.js';
const { fromEvent, from, of } = rxjs;
const {
    debounceTime,
    filter,
    distinctUntilChanged,
    map,
    switchMap,
    tap
} = rxjs.operators;

class ItemSearch extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/css/inventory/items.search.css');

        const itemsSrc = document.createElement('script');
        itemsSrc.setAttribute('type', 'module');
        itemsSrc.setAttribute('src', '/static/js/components/inventory/items.table.js');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this.init(self, div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(itemsSrc);
        shadow.appendChild(div);
    }

    connectedCallback() {
        if (this.isConnected) {
            const self = this;
            const shadow = this.shadowRoot;

            const tab = this.hasAttribute('tab') ? document.querySelector(this.getAttribute('tab')) : null;
            const client_id = this.hasAttribute('client-id') ? this.getAttribute('client-id') : '';
            if (tab != null) {
                shadow.querySelector('button.btn-new').addEventListener('click', function(e) {
                    tab.addTab('inventory-item-editor', 'Item', '<item-editor  client-id="{{ client_id }}"></item-editor>');
                });
            }

            const search = shadow.getElementById('search');
            const items = shadow.querySelector('items-table');
            fromEvent(search, 'keyup')
                .pipe(
                    debounceTime(250),
                    // map(e => e.target.value),
                    map(e => search.value),
                    filter(query => query.length > 3),
                    distinctUntilChanged(),
                    switchMap(query => from(InventoryItem.find(window.clientId, query))),
                    tap(r => {
                        console.log(r);
                        if (r.status == 'success') {
                            items.setItems(r.json.items, r.json.filter);
                        } else {
                            // self.dispatchEvent(new CustomEvent('error', {
                            //     bubbles: true,
                            //     cancelable: true,
                            //     detail: {
                            //         message: r.message
                            //     }
                            // }));
                            console.log(r.message);
                        }
                    })
                )
                .subscribe();
        }
    }

    init(component, container) {
        const tab = this.hasAttribute('tab') ? this.getAttribute('tab') : '';
        if (tab == '') {
            console.error('tab attribute is required');
        }

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="form-wrapper">
                <div class="toolbar" role="toolbar" aria-label="Inventory Items">
                    <button type="button" class="btn btn-new">
                        <span class="material-icons">insert_drive_file</span>
                    </button>
                </div><!-- .toolbar -->
                <form class="form-search">
                    <label for="search">Search</label>
                    <input type="search" id="search" class="form-input-search" title="Search" placeholder="Search" />
                </form>
                <items-table hide-description></items-table>
            </div><!-- .form-wrapper -->
        `;
        container.appendChild(div);
    }
}
customElements.define('item-search', ItemSearch);
export { ItemSearch };