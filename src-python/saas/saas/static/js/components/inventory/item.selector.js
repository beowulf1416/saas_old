'use strict';

class ItemSelector extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/css/inventory/items.selector.css');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this.init(self, div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(div);
    }

    init(component, container) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        wrapper.innerHTML = `
            <div class="form-group">
                <input type="text" id="selector" title="Inventory Item Selector" placeholder="Select" />
            </div><!-- .form-group -->
        `;

        container.appendChild(wrapper);
    }
}
customElements.define('item-selector', ItemSelector);
export { ItemSelector };