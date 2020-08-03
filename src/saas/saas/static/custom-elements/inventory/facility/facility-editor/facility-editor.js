'use strict';
import { Facility } from '/static/js/modules/inventory/facility.js';
import { notify } from '/static/js/ui/ui.js';
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
        this._fetch = this._fetch.bind(this);
        this.setFacility = this.setFacility.bind(this);

        this._attachEventHandlers();
        this._fetch();
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
                    <country-selector id="country"></country-selector>

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

        const client_id = this.getAttribute('client-id');
        const facility_id = this.getAttribute('facility-id');

        shadow.getElementById('btn-save').addEventListener('click', function() {
            const input_name = shadow.getElementById('name');
            const input_desc = shadow.getElementById('description');
            const input_addr = shadow.getElementById('address');
            const input_country = shadow.getElementById('country');
            const input_area = shadow.getElementById('area');
            const input_area_uom = shadow.getElementById('area-uom-id');

            if (facility_id) {
                Facility.update(
                    client_id,
                    facility_id,
                    input_name.value,
                    input_desc.value,
                    input_addr.value,
                    input_country.value,
                    input_area.value,
                    input_area_uom.value
                );
            } else {
                const tmp_facility_id = uuidv4();
                Facility.add(
                    client_id,
                    tmp_facility_id,
                    input_name.value,
                    input_desc.value,
                    input_addr.value,
                    input_country.value,
                    input_area.value,
                    input_area_uom.value
                );
            }
        });
    }

    _fetch() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');
        const facility_id = this.getAttribute('facility-id');

        if (client_id && facility_id) {
            Facility.get(client_id, facility_id).then((r) => {
                if (r.status == 'success') {
                    self.setFacility(r.json.facility);
                } else {
                    notify(r.status, r.message, 3000);
                }
            });
        }
    }

    setFacility(facility = {}) {
        const self = this;
        const shadow = this.shadowRoot;

        shadow.getElementById('name').value = facility.name;
        shadow.getElementById('description').value = facility.description;
        shadow.getElementById('address').value = facility.address;
        shadow.getElementById('country').setAttribute('country-id', facility.countryId);
        shadow.getElementById('area').value = facility.area;
        shadow.getElementById('area-uom').setAttribute('uom-id', facility.areaUomId);
    }
}
customElements.define('facility-editor', FacilityEditor);