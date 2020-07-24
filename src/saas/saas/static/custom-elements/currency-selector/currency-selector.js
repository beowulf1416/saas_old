'use strict';
import { showInView } from '/static/js/ui/ui.js';
class CurrencySelector extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/currency-selector/currency-selector.css');

        const default_style = document.createElement("link");
        default_style.setAttribute('rel', 'stylesheet');
        default_style.setAttribute('href', '/static/css/default.css');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this._init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(default_style);
        shadow.appendChild(div);

        this._attachEventHandlers = this._attachEventHandlers.bind(this);
        this.value = this.value.bind(this);

        this._attachEventHandlers();
    }

    // static get observedAttributes() { 
    //     return ['currency-id']; 
    // }

    // attributeChangedCallback(name, oldValue, newValue) {
    //     if (name == 'currency-id') {
    //         console.log('update currency id');
    //         self._currency_id = this.getAttribute('currency-id');
    //         console.log(self._currency_id);
    //     }
    // }

    _init(container) {
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <input type="text" id="display" name="display" class="form-input-display" title="Currency" placeholder="Currency" readonly />
            <button type="button" id="btn-select" class="btn btn-select" title="Select Currency">
                <span>&hellip;</span>
            </button>
        `;
        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const input_display = shadow.getElementById('display');

        const btnselect = shadow.getElementById('btn-select');
        btnselect.addEventListener('click', function() {
            const selector = showInView('Select Currency', `<currency-selector-view></currency-selector-view>`);
            selector.addEventListener('selected', function(e) {
                const currency = e.detail.currency;

                input_display.value = currency.name;
                self.setAttribute('currency-id', currency.id);
            });
        });
    }

    value() {
        return this.getAttribute('currency-id');
    }
}
customElements.define('currency-selector', CurrencySelector);