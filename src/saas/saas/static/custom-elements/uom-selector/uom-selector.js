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

        this._attachEventHandlers = this._attachEventHandlers.bind(this);
        this._fetch = this._fetch.bind(this);
        this.value = this.value.bind(this);
 
        this._attachEventHandlers();
        this._fetch();
    }

    get value() {
        return this.getAttribute('uom-id');
    }

    static get observedAttributes() { 
        return ['uom-id']; 
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'uom-id') {
            this._fetch();
        }
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

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');
        const dimention = this.hasAttribute('dimension') ? this.getAttribute('dimension') : 'quantity';

        shadow.getElementById('btn-select').addEventListener('click', function() {
            const selector = showInView('Select Unit of Measure', `<uom-selector-view client-id="${client_id}" dimension="${dimension}"></uom-selector-view>`);
            selector.addEventListener('change', function(e) {
                const uom = e.detail.uom;

                self.setAttribute('uom-id', uom.id);
            });
        });
    }

    _fetch() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');
        const dimension = this.getAttribute('dimension');
        const uom_id = this.getAttribute('uom-id');

        if (dimension && uom_id) {
            Common.uom_get(client_id, dimension, uom_id).then((r) => {
                if (r.status == 'success') {
                    const uom = r.json.uom
                    
                    const input_display = shadow.getElementById('display');
                    input_display.value = uom.name;
                } else {
                    notify(r.status, r.message, 3000);
                }
            });
        }
    }
}
customElements.define('uom-selector', UomSelector);