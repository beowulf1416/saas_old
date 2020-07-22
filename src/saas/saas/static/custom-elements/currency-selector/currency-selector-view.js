'use strict';
import { Common } from '/static/js/modules/common/common.js';
import { notify } from '/static/js/ui/ui.js';
import { Util } from '/static/js/util.js';
class CurrencySelectorView extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/currency-selector/currency-selector-view.css');

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
        this.setCurrencies = this.setCurrencies.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="form-wrapper">
                <form id="form-filter-currencies">
                    <label for="filter">Filter</label>
                    <input type="search" id="filter" name="filter" class="form-input-filter" title="Filter Currencies" placeholder="Search" />
                    <button type="button" id="btn-filter" class="btn btn-filter" title="Search">
                        <span class="material-icons">search</span>
                    </button>
                </form>
            </div><!-- .form-wrapper -->
            <div class="table-wrapper">
                <table id="tbl-currencies">
                    <caption>Currencies</caption>
                    <colgroup>
                        <col class="col-select">
                        <col class="col-name">
                        <col class="col-currency">
                    </colgroup>
                    <thead>
                        <tr>
                            <td scope="col"></td>
                            <th scope="col">Name</th>
                            <th scope="col">Currency</th>
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

        const beginsearch = function(filter) {
            Common.currencies(filter).then((r) => {
                if (r.status == 'success') {
                    self.setCurrencies(r.json.currencies, filter);
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
        btnfilter.addEventListener('click', function() {
            beginsearch(filter.value);
        });
    }

    setCurrencies(currencies = [], filter = '') {
        const self = this;
        const shadow = this.shadowRoot;

        const tbody = shadow.querySelector('table#tbl-currencies tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        currencies.forEach((c) => {
            const id = 'id' + Util.generateId();
            const currency_name = c.name.replace(filter, `<strong>${filter}</strong>`);

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="radio" id="${id}" name="selected" class="form-input-selected" title="Select Currency" value="${c.id}" data-name="${c.name}" data-currency="${c.currency}" data-symbol="${c.symbol}" /></td>
                <td><label for="${id}">${currency_name}</label></td>
                <td><label for="${id}">${c.currency}</label></td>
            `;

            tbody.appendChild(tr);

            // event handlers
            const selected = tr.querySelector('.form-input-selected');
            selected.addEventListener('change', function(e) {
                e.preventDefault();

                self.dispatchEvent(new CustomEvent('selected', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        currency: {
                            id: selected.value,
                            name: selected.dataset.name,
                            currency: selected.dataset.currency,
                            symbol: selected.dataset.symbol
                        }
                    }
                }));
            });
        });
    }
}
customElements.define('currency-selector-view', CurrencySelectorView);