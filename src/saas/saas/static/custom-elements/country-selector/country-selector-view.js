'use strict';
import { notify } from '/static/js/ui/ui.js';
import { Common } from '/static/js/modules/common/common.js';
import { Util } from '/static/js/util.js';
class CountrySelectorView extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/country-selector/country-selector.css');

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
        div.innerHTML = `
            <form-search id="search" title="Find Country" placeholder="Country">
            </form-search>
            <div class="table-wrapper">
                <table id="tbl-countries">
                    <caption>Countries</caption>
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

        shadow.getElementById('search').addEventListener('search', function(e) {
            const filter = e.detail.filter;

            Common.countries(filter).then((r) => {
                if (r.status == 'success') {
                    self.setCountries(r.json.countries, filter);
                } else {
                    notify(r.status, r.message, 3000);
                }
            });
        });
    }

    setCountries(countries = [], filter) {
        const self = this;
        const shadow = this.shadowRoot;

        const tbody = shadow.querySelector('table#tbl-countries tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        countries.forEach((c) => {
            const id = 'id' + Util.generateId();
            const country_name = c.name.replace(filter, `<strong>${filter}</strong>`);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="radio" id="${id}" name="selected" class="form-input-selected" title="Select Country" value="${c.id}" data-name="${c.name}" /></td>
                <td><label for="${id}">${country_name}</label></td>
            `;

            tbody.appendChild(tr);

            // event handler
            tr.querySelector('.form-input-selected').addEventListener('change', function(e) {
                self.dispatchEvent(new CustomEvent('change', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        country: {
                            id: this.value,
                            name: this.dataset.name
                        }
                    }
                }));
            });
        });
    }
}
customElements.define('country-selector-view', CountrySelectorView);