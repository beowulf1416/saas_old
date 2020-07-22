'use strict';
import { Common } from '/static/js/modules/common/common.js';
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
    }
}
customElements.define('currency-selector-view', CurrencySelectorView);