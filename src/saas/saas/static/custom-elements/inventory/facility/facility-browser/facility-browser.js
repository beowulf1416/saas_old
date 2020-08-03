'use strict';
import { notify, showInTab } from '/static/js/ui/ui.js';
import { Facility } from '/static/js/modules/inventory/facility.js';
class FacilityBrowser extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/inventory/facility/facility-browser/facility-browser.css');

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
        this.setFacilities = this.setFacilities.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button type="button" id="btn-new-facility" class="btn btn-new" title="New Facility">
                    <span class="material-icons">home_work</span>
                </button>
            </div><!-- .toolbar -->
            <form-search id="search" title="Search for Facility" placeholder="Facility"></form-search>
            <div class="table-wrapper">
                <table id="tbl-facilities">
                    <caption>Facilities</caption>
                    <colgroup>
                        <col class="edit">
                        <col class="name">
                        <col class="description">
                        <col class="address">
                    </colgroup>
                    <thead>
                        <tr>
                            <td scope="col"></td>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Address</th>
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

        const search = shadow.getElementById('search');
        search.addEventListener('search', function(e) {
            const filter = e.detail.filter;

            Facility.filter(client_id, filter).then((r) => {
                if (r.status == 'success') {
                    self.setFacilities(r.json.facilities, filter);
                } else {
                    notify(r.status, r.message, 3000);
                }
            });
        });

        shadow.getElementById('btn-new-facility').addEventListener('click', function() {
            showInTab('inventory-facility', 'New Facility', `<facility-editor client-id="${client_id}"></facility-editor>`);
        });
    }

    setFacilities(facilities = [], filter = '') {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        const tbody = shadow.querySelector('table#tbl-facilities tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        facilities.forEach((f) => {
            const facility_name = f.name.replace(filter, `<strong>${filter}</strong>`);
            const facility_desc = f.description.replace(filter, `<strong>${filter}</strong>`);
            const facility_addr = f.address.replace(filter, `<strong>${filter}</strong>`);

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><a title="Edit Facility" class="link-edit-facility" href="#"><span class="material-icons">edit</span></a></td>
                <td>${facility_name}</td>
                <td>${facility_desc}</td>
                <td>${facility_addr}</td>
            `;

            tbody.appendChild(tr);

            // event handlers
            tr.querySelector('.link-edit-facility').addEventListener('click', function(e) {
                e.preventDefault();

                showInTab('inventory-facility', 'Edit Facility', `<facility-editor client-id="${client_id}" facility-id="${f.facilityId}"></facility-editor>`);
            });
        });
    }
}
customElements.define('facility-browser', FacilityBrowser);