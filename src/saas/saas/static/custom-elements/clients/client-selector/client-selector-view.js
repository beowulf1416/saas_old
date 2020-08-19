'use strict';
import { Clients } from '/static/js/modules/admin/clients.js';
import { notify } from '/static/js/ui/ui.js';
import { Util } from '/static/js/util.js';
class ClientSelectorView extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/clients/client-selector/client-selector.css');

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
            <div class="form-wrapper">
                <form id="form-search" role="search">
                    <label for="filter">Client</label>
                    <input type="search" id="filter" name="filter" class="form-input form-input-filter" placeholder="Client" />
                    <button type="button" id="btn-filter" class="btn btn-filter" title="Search for Client">
                        <span class="material-icons">search</span>
                    </button>
                </form>
            </div><!-- .form-wrapper -->
            <div class="table-wrapper">
                <table id="tbl-clients">
                    <caption>Clients</caption>
                    <colgroup>
                        <col class="selected">
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

        const beginsearch = function(filter) {
            Clients.filter(filter).then((r) => {
                if (r.status == 'success') {
                    self._setClients(r.json.clients, filter);
                } else {
                    notify(r.status, r.message, 5000);
                }
            });
        };

        const filter = shadow.getElementById('filter');
        filter.addEventListener('keydown', function(e) {
            if (e.keyCode == 13) {
                beginsearch(filter.value);
                e.preventDefault();
            }
        });

        shadow.getElementById('btn-filter').addEventListener('click', function(e) {
            beginsearch(filter.value);
        });
    }

    _setClients(clients = [], filter = '') {
        const self = this;
        const shadow = this.shadowRoot;

        const tbody = shadow.querySelector('table#tbl-clients tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        clients.forEach((c) => {
            const id = Util.generateId();
            const client_name = c.name.replace(filter, `<strong>${filter}</strong>`);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <input type="radio" id="id-${id}" name="selected" class="form-input-selected" title="Select Client" value="${c.id}" />
                </td>
                <td>
                    <label for="id-${id}">${client_name}</label>
                </td>
            `;

            tbody.appendChild(tr);

            // event handlers
            const selected = shadow.getElementById(`id-${id}`);
            selected.addEventListener('change', function(e) {
                self.dispatchEvent(new CustomEvent('selected', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        client: {
                            id: selected.value
                        }
                    }
                }));
            });
        });
    }
}
customElements.define('client-selector-view', ClientSelectorView);