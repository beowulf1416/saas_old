'use strict';
import { showInTab } from '/static/js/ui/ui.js';
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

        this._attachEventHandlers();
    }

    _init(container) {
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
                            <td></td>
                            <th>Name</th>
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

        const btnnewloc = shadow.getElementById('btn-new-location');
        btnnewloc.addEventListener('click', function(e) {
            showInTab('inventory-location', 'New Location', `<location-editor client-id="${client_id}"></location-editor>`);
        });
    }
}
customElements.define('location-explorer', LocationExplorer);