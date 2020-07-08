'use strict';
import { Util } from '/static/js/util.js';
import { Vendors } from '/static/js/modules/purchasing/vendors.js';
class VendorSelectorView extends HTMLElement {

    constructor() {
        const self = super();
        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/purchasing/vendor-selector-view/vendor-selector-view.css');

        const google_web_fonts = document.createElement("link");
        google_web_fonts.setAttribute('rel', 'stylesheet');
        google_web_fonts.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this._init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(google_web_fonts);
        shadow.appendChild(div);

        this._attachEventHandlers = this._attachEventHandlers.bind(this);
        this.setVendors = this.setVendors.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="form-wrapper">
                <form id="form-filter">
                    <label for="filter">Vendor</label>
                    <input type="search" id="filter" name="filter" class="form-input-filter" title="Search for Vendor" placeholder="Vendor" />
                    <button type="button" id="btn-filter" class="btn btn-filter" title="Search">
                        <span class="material-icons">search</span>
                    </button>
                </form>
            </div><!-- .form-wrapper -->
            <div class="table-wrapper">
                <table id="tbl-vendors">
                    <caption>Vendors</caption>
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

        const beginsearch = function(filter) {
            Vendors.filter(client_id, filter).then((r) => {
                if (r.status == 'success') {
                    const vendors = r.json.vendors;
                    self.setVendors(vendors, filter);
                } else {
                    notify(r.status, r.message);
                }
            });
        };

        const filter = shadow.getElementById('filter');
        filter.addEventListener('keyup', function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();

                beginsearch(filter.value);
            }
        });

        const btnfilter = shadow.getElementById('btn-filter');
        btnfilter.addEventListener('click', function(e) {
            beginsearch(filter.value);
        });
    }

    setVendors(vendors = [], filter = '') {
        const self = this;
        const shadow = this.shadowRoot;

        const tbody = shadow.querySelector('table#tbl-vendors tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        vendors.forEach((v) => {
            const id = 'id' + Util.generateId();
            const vendor_name = v.name.replace(filter, `<strong>${filter}</strong>`);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="radio" id="${id}" name="selected" class="form-input-selected" title="Select Vendor" value="${v.id}" /></td>
                <td><label for="${id}">${vendor_name}</label></td>
            `;

            tbody.appendChild(tr);

            // event handlers
            const select = tr.querySelector('.form-input-selected');
            select.addEventListener('change', function(e) {
                e.preventDefault();

                self.dispatchEvent(new CustomEvent('change', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        vendor: {
                            id: select.value
                        }
                    }
                }));
            });
        });
    }
}
customElements.define('vendor-selector-view', VendorSelectorView);