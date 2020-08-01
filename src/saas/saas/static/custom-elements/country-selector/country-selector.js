'use strict';
import { showInView } from '/static/js/ui/ui.js';
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
        this._attachEventHandlers();
    }

    _init(container) {
        const div = document.createElement('div');
        div.innerHTML = `
            <input type="text" id="display" name="display" class="form-input-display" title="Select Country" placeholder="Country" readonly />
            <button type="button" id="btn-select" class="btn btn-select" title="Select Country">&hellip;</button>
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

                console.log(country);
            });
        });
    }
}
customElements.define('country-selector', CountrySelector);