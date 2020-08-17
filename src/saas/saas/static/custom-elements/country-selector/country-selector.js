'use strict';
import { notify, showInView } from '/static/js/ui/ui.js';
import { Common } from '/static/js/modules/common/common.js';
class CountrySelector extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/country-selector/country-selector.css');

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
        this._fetch = this._fetch.bind(this);
        // this.value = this.value.bind(this);

        this._attachEventHandlers();
    }

    static get observedAttributes() { 
        return ['country-id']; 
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'country-id') {
            this._fetch();
        }
    }

    _init(container) {
        const div = document.createElement('div');
        div.innerHTML = `
            <button type="button" id="btn-select" class="btn btn-select" title="Select Country">
                Select Country
            </button>
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        shadow.getElementById('btn-select').addEventListener('click', function() {
            const selector = showInView('Select Country', '<country-selector-view></country-selector-view>');
            selector.addEventListener('change', function(e) {
                const country = e.detail.country;
                self.setAttribute('country-id', country.id);
            });
        });
    }

    _fetch() {
        const self = this;
        const shadow = this.shadowRoot;

        const country_id = this.getAttribute('country-id');

        if (country_id) {
            Common.country_get(country_id).then((r) => {
                if (r.status == 'success') {
                    const country = r.json.country;
                    shadow.getElementById('btn-select').innerText = country.name;
                } else {
                    notify(r.status, r.mesasge, 3000);
                }
            });
        }
    }

    get value() {
        return this.getAttribute('country-id');
    }
}
customElements.define('country-selector', CountrySelector);