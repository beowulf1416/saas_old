'use strict';
import { showInTab } from '/static/js/ui/ui.js';
import { Locations } from '/static/js/modules/inventory/locations.js';
class LocationExplorer extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/inventory/location-explorer/location-explorer.css');

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
        this.setLocations = this.setLocations.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const client_id = this.getAttribute('client-id');

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button id="btn-new-location" class="btn btn-new" title="New Location">
                    <span class="material-icons">add_location_alt</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form id="filter-locations" role="search">
                    <!-- filter -->
                    <label for="filter">Find</label>
                    <input type="search" id="filter" name="filter" class="form-input-filter" title="Filter Locations" placeholder="Location" />
                    <warehouse-selector client-id="${client_id}"></warehouse-selector>
                    <button type="button" id="btn-filter" class="btn btn-filter" title="Filter">
                        <span class="material-icons">search</span>
                    </button>
                </form>
            </div><!-- .form-wrapper -->
            <div class="table-wrapper">
                <table id="tbl-locations">
                    <caption>Locations</caption>
                    <colgroup>
                        <col class="edit">
                        <col class="name">
                    </colgroup>
                    <thead>
                        <tr>
                            <td scope="col"></td>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div><!-- .table-wrapper -->
        `;
        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        const beginsearch = function(filter) {
            Locations.filter(client_id, filter).then((r) => {
                if (r.status == 'success') {
                    self.setLocations(r.json.locations, filter);
                } else {
                    notify(r.status, r.message, 3000);
                }
            });
        };

        const input_filter = shadow.getElementById('filter');
        input_filter.addEventListener('keydown', function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();

                beginsearch(input_filter.value);
            }
        });

        const btnfilter = shadow.getElementById('btn-filter');
        btnfilter.addEventListener('click', function(e) {
            beginsearch(input_filter.value);
        });

        const btnnewloc = shadow.getElementById('btn-new-location');
        btnnewloc.addEventListener('click', function(e) {
            showInTab('inventory-location', 'New Location', `<location-editor client-id="${client_id}"></location-editor>`);
        });
    }

    setLocations(locations = [], filter = '') {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        const tbody = shadow.querySelector('table#tbl-locations tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        locations.forEach((l) => {
            const location_id = l.id;
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><a title="Edit Location" class="link-edit-loc" href="#" data-locationid="${location_id}"><span class="material-icons">edit</span></a></td>
                <td>${l.name}</td>
            `;

            tbody.appendChild(tr);

            // event handlers
            const linkedit = tr.querySelector('.link-edit-loc');
            linkedit.addEventListener('click', function(e) {
                e.preventDefault();

                const location_id = linkedit.dataset.locationid;
                showInTab('inventory-location', 'Edit Location', `<location-editor client-id="${client_id}" location-id="${location_id}"></location-editor>`);
            });
        });
    }
}
customElements.define('location-explorer', LocationExplorer);