'use strict';
class FacilityEditor extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/inventory/facility/facility-editor/facility-editor.css');

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
        const client_id = this.getAttribute('client-id');

        const div = document.createElement('div');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button type="button" id="btn-save" class="btn btn-save" title="Save">
                    <span class="material-icons">save</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form id="form-facility">
                    <!-- name -->
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" class="form-input-text" title="Facility Name" placeholder="Name" />

                    <!-- description -->
                    <label for="description">Description</label>
                    <textarea id="description" name="description" class="form-input-desc" title="Facility Description"></textarea>

                    <!-- address -->
                    <label for="address">address</label>
                    <textarea id="address" name="address" class="form-input-address" title="Facility Address"></textarea>

                    <!-- country -->
                    <label for="country">Country</label>
                    <country-selector></country-selector>

                    <!-- area -->
                    <label for="area">Area</label>
                    <input type="number" id="area" name="area" class="form-input-area" title="Area" />

                    <!-- area uom -->
                    <label for="area-uom">Unit</label>
                    <uom-selector id="area-uom" client-id="${client_id}" dimension="area"></uom-selector>
                </form>
            </div><!-- .form-wrapper -->
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;


    }
}
customElements.define('facility-editor', FacilityEditor);