'use strict';
class UomSelector extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/uom-selector/uom-selector.css');

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
    }

    _init(container) {
        const title = this.hasAttribute('title') ? this.getAttribute('title') : 'Unit Of  Measure';
        const placeholder = this.hasAttribute('placeholder') ? this.getAttribute('placeholder') : 'Unit of Measure';

        const div = document.createElement('div');
        div.innerHTML = `
            <input type="text" id="display" name="display" class="form-input-display" title="${title}" placeholder="${placeholder}" readonly />
            <button type="button" id="btn-select" class="btn btn-select" title="Select Unit Of Measure">&hellip;</button>
        `;

        container.appendChild(div);
    }
} 