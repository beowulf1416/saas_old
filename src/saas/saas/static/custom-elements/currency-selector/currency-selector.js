'use strict';
import { showInView } from '/static/js/ui/ui.js';
import { Common } from '/static/js/modules/common/common.js';
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
        this._fetch = this._fetch.bind(this);

        this._attachEventHandlers();
        this._fetch();
    }
    
    static get observedAttributes() { 
        return ['currency-id']; 
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'currency-id') {
            this._fetch();
        }
    }

    _init(container) {
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <button type="button" id="btn-select" class="btn btn-select" title="Select Currency">
                Select Currency
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
                self.setAttribute('currency-id', currency.id);
            });
        });
    }

    value() {
        return this.getAttribute('currency-id');
    }

    _fetch() {
        const self = this;
        const shadow = this.shadowRoot;

        const currency_id = this.getAttribute('currency-id');
        if (currency_id) {
            const btn_select = shadow.getElementById('btn-select');
            Common.currency_get(currency_id).then((r) => {
                if (r.status == 'success') {
                    const currency = r.json.currency;
                    shadow.getElementById('btn-select').innerText = currency.name;
                } else {
                    notify(r.status, r.message, 3000);
                }
            });
        }
    }
}
customElements.define('currency-selector', CurrencySelector);