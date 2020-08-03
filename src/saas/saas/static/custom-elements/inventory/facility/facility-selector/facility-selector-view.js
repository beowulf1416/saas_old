'use strict';
import { Facility } from '/static/js/modules/inventory/facility.js';
import { Util } from '/static/js/util.js';
import { notify } from '/static/js/ui/ui.js';
class FacilitySelectorView extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/inventory/facility/facility-selector/facility-selector.css');

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
            <form-search id="search"></form-search>
            <div class="table-wrapper">
                <table id="tbl-facilities">
                    <caption>Facilities</caption>
                    <colgroup>
                        <col class="select">
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

        shadow.getElementById('search').addEventListener('search', function(e) {
            const filter = e.detail.filter;

            Facility.filter(client_id, filter).then((r) => {
                if (r.status == 'success') {
                    self.setFacilities(r.json.facilities, filter);
                } else {
                    notify(r.status, r.message, 3000);
                }
            });
        });
    }

    setFacilities(facilities = [], filter = '') {
        const self = this;
        const shadow = this.shadowRoot;

        const tbody = shadow.querySelector('table#tbl-facilities tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        facilities.forEach((f) => {
            const id = 'id' + Util.generateId();
            const facility_name = f.name.replace(filter, `<strong>${filter}</strong>`);

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="radio" id="${id}" name="selected" class="form-input-selected" title="Selected" value="${f.facilityId}" /></td>
                <td><label for="${id}">${facility_name}</label></td>
            `;

            tbody.appendChild(tr);

            // event handlers
            tr.querySelector('.form-input-selected').addEventListener('change', function(e) {
                self.dispatchEvent(new CustomEvent('change', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        facility: {
                            id: this.value
                        }
                    }
                }));
            });
        });
    }
}
customElements.define('facility-selector-view', FacilitySelectorView);