'use strict';
import { InventoryItem } from '/static/js/modules/inventory/items.js';
import { notify, showInView } from '/static/js/ui/ui.js';
class ItemSelector extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/inventory/item-selector/item-selector.css');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this._init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(div);

        this._attachEventHandlers = this._attachEventHandlers.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const self = this;

        const client_id = this.getAttribute('client-id');
        self._item_id = this.hasAttribute('item-id') ? this.getAttribute('item-id') : '';

        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        wrapper.innerHTML = `
            <input type="text" id="display" name="display" class="form-input-display" title="Item Selector" placeholder="Select Item" value="" readonly />
            <button type="button" id="btn-select" title="Select Item">...</button> 
        `;

        container.appendChild(wrapper);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        const btnselect = shadow.getElementById('btn-select');
        btnselect.addEventListener('click', function(e) {
            const selector = showInView('Select Item', `<item-selector-view client-id="${client_id}"></item-selector-view>`);
            selector.addEventListener('change', function(e) {
                const item_id = e.detail.itemId;
                self._item_id = item_id;

                InventoryItem.get(item_id).then((r) => {
                    if (r.status == 'success') {
                        const item = r.json.item;
                        const display = shadow.getElementById('display');
                        display.value = item.name;

                        self.dispatchEvent(new CustomEvent('change', {
                            bubbles: true,
                            cancelable: true,
                            detail: {
                                item: item
                            }
                        }));
                    } else {
                        notify(r.status, r.message);
                    }
                });
            });
        });
    }

    value() {
        const self = this;
        return self._item_id;
    }
}
customElements.define('item-selector', ItemSelector);