'use strict';
import { InventoryItem } from '/static/js/helpers/inventory/items.js';
import { ItemsTable } from '/static/js/components/inventory/items.table.js';

const { fromEvent, from, of } = rxjs;
const {
    debounceTime,
    filter,
    distinctUntilChanged,
    map,
    switchMap,
    tap
} = rxjs.operators;

class ItemSelector extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/css/inventory/items.selector.css');

        // const rxjsSrc = document.createElement('script');
        // rxjsSrc.src = 'https://unpkg.com/rxjs/bundles/rxjs.umd.min.js';

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this.init(self, div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        // shadow.appendChild(rxjsSrc);
        shadow.appendChild(div);
    }

    init(component, container) {
        const self = this;

        const client_id = this.hasAttribute('client-id') ? this.getAttribute('client-id') : '';
        if (client_id == '') {
            console.error('client-id attribute is missing');
            self.dispatchEvent(new CustomEvent('error', {
                bubbles: true,
                cancelable: true,
                detail: 'client-id attribute is missing'
            }));
        }

        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        wrapper.innerHTML = `
            <form class="form-item-selector">
                <fieldset>
                    <label for="filter">Item</label>
                    <input type="search" id="filter" title="Search for Item" placeholder="Search" />
                </fieldset>
            </form>
            <div class="wrapper">
                <items-table hide-quantity></items-table>
            </div><!-- .wrapper -->
        `;

        container.appendChild(wrapper);
    }

    connectedCallback() {
        if (this.isConnected) {
            const self = this;
            const shadow = this.shadowRoot;

            const client_id = this.hasAttribute('client-id') ? this.getAttribute('client-id') : '';

            const itemsTbl = shadow.querySelector('items-table');
            const tfilter = shadow.querySelector('input#filter');
            fromEvent(tfilter, 'keyup')
            .pipe(
                debounceTime(250),
                // tap(e => {
                //     // console.log(e);
                //     // console.log(tfilter.value);
                //     // return e;
                //     return tfilter.value;
                // }),
                // map(e => e.target.value),
                map(e => tfilter.value),
                filter(query => query.length > 3),
                distinctUntilChanged(),
                switchMap(query => from(InventoryItem.find(client_id, query))),
                tap(r => {
                    console.log(r);
                    if (r.status == 'success') {
                        itemsTbl.setItems(r.json.items, r.json.filter);
                    } else {
                        // notifier.error(r.message);
                        console.error(r);
                    }
                })
            )
            .subscribe();
        }
    }
}
customElements.define('item-selector', ItemSelector);
export { ItemSelector };