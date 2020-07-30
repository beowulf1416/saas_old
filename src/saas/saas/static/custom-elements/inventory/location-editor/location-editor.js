'use strict';
import { Locations } from '/static/js/modules/inventory/locations.js';
import { notify } from '/static/js/ui/ui.js';
class LocationEditor extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/inventory/location-editor/location-editor.css');

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

        this._attachEventHandlers();
        this._fetch();
    }

    _init(container) {
        const client_id = this.getAttribute('client-id');

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button id="btn-save" class="btn btn-save" title="Save">
                    <span class="material-icons">save</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form id="form-location">
                    <!-- name -->
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" class="form-input-name" title="Name" placeholder="Name" />
                    <button type="button" id="btn-name-generate" class="btn btn-name" title="Generate name">
                        <span class="material-icons">autorenew</span>
                    </button>
                    <fieldset id="locator">
                        <!-- warehouse -->
                        <label for="warehouse">Warehouse</label>
                        <warehouse-selector id="warehouse" client-id="${client_id}"></warehouse-selector>

                        <!-- floor -->
                        <label for="floor">Floor</label>
                        <input type="text" id="floor" name="floor" class="form-input-floor" title="Floor" placeholder="Floor" />

                        <!-- aisle -->
                        <label for="aisle">Aisle</label>
                        <input type="text" id="aisle" name="aisle" class="form-input-aisle" title="Aisle" placeholder="Aisle" />

                        <!-- shelf -->
                        <label for="shelf">Shelf</label>
                        <input type="text" id="shelf" name="shelf" class="form-input-shelf" title="Shelf" placeholder="Shelf" />

                        <!-- rack -->
                        <label for="rack">Rack</label>
                        <input type="text" id="rack" name="rack" class="form-input-rack" title="Rack" placeholder="Rack" />

                        <!-- level -->
                        <label for="level">Level</label>
                        <input type="text" id="level" name="level" class="form-input-level" title="Level" placeholder="Level" />

                        <!-- bin -->
                        <label for="bin">Bin</label>
                        <input type="text" id="bin" name="bin" class="form-input-bin" title="Bin" placeholder="Bin" />
                    </fieldset>
                </form>
            </div><!-- .form-wrapper -->
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');
        const location_id = this.getAttribute('location-id');

        const btnsave = shadow.getElementById('btn-save');
        btnsave.addEventListener('click', function() {
            const input_name = shadow.getElementById('name');
            const input_warehouse = shadow.getElementById('warehouse');
            const input_floor = shadow.getElementById('floor');
            const input_aisle = shadow.getElementById('aisle');
            const input_shelf = shadow.getElementById('shelf');
            const input_rack = shadow.getElementById('rack');
            const input_level = shadow.getElementById('level');
            const input_bin = shadow.getElementById('bin');

            if (location_id) {
                Locations.update(
                    client_id, 
                    location_id,
                    input_warehouse.value(),
                    input_name.value,
                    input_floor.value,
                    input_aisle.value,
                    input_shelf.value,
                    input_rack.value,
                    input_level.rack,
                    input_bin.value
                    ).then((r) => {
                    notify(r.status, r.message, 3000);
                });
            } else {
                const tmp_location_id = uuidv4();
                Locations.add(
                    client_id,
                    tmp_location_id,
                    input_warehouse.value(),
                    input_name.value,
                    input_floor.value,
                    input_aisle.value,
                    input_shelf.value,
                    input_rack.value,
                    input_level.rack,
                    input_bin.value
                    ).then((r) => {
                    notify(r.status, r.mesage, 3000);
                });
            }
        });
    }

    _fetch() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');
        const location_id = this.getAttribute('location-id');

        if (location_id) {
            Locations.get(client_id, location_id).then((r) => {
                if (r.status == 'success') {
                    const location = r.json.location;

                    shadow.getElementById('name').value = location.name;
                    shadow.getElementById('warehouse').setAttribute('warehouse-id', location.warehouseId);
                    shadow.getElementById('floor').value = location.floorId;
                    shadow.getElementById('aisle').value = location.aisleId;
                    shadow.getElementById('shelf').value = location.shelfId;
                    shadow.getElementById('rack').value = location.rackId;
                    shadow.getElementById('level').value = location.levelId;
                    shadow.getElementById('bin').value = location.binId;
                } else {
                    notify(r.status, r.message);
                }
            });
        }
    }
}
customElements.define('location-editor', LocationEditor);