'use strict';

class PurchaseOrders extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/inventory/warehouse.selector/warehouse.selector.css');

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
        this._getClientId = this._getClientId.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const client_id = this.getAttribute('client-id');

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button id="btn-filter" type="button" class="btn btn-new" title="New Purchase Order">
                    <span class="material-icons">new</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form class="form-po-filter">
                    <input type="hidden" id="client-id" name="client_id" value="${client_id}" />

                    <label for="filter">Purchase Orders</label>
                    <input type="search" id="filter" name="filter" title="Purchase Order" placeholder="Purchase Order" />
                    <button type="button" class="btn btn-filter" title="Search">
                        <span class="material-icons">search</span>
                    </button>
                </form>
            </div><!-- .form-wrapper -->
        `;

        container.appendChild(div);
    }

    _getClientId() {
        const shadow = this.shadowRoot;
        const client = shadow.getElementById('client-id');
        return client.value;
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this._getClientId();

        const beginsearch = function(filter) {
            console.log('// TODO');
        };

        const filter = shadow.getElementById('filter');
        filter.addEventListener('keyup', function(e) {
            if (e.keyCode == 13) {
                beginsearch(filter.value);
                e.preventDefault();
            }
        });

        const btnfilter = shadow.getElementById('btn-filter');
        btnfilter.addEventListener('click', function(e) {
            beginsearch(filter.value);
        });
    }
}
customElements.define('purchase-orders', PurchaseOrders);