'use strict';
import { Clients } from '/static/js/helpers/clients/clients.js';
import { showInTab, notify } from '/static/js/ui/ui.js';

class ClientsTable extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/clients.table/clients.table.css');

        const google_web_fonts = document.createElement("link");
        google_web_fonts.setAttribute('rel', 'stylesheet');
        google_web_fonts.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this.init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(google_web_fonts);
        shadow.appendChild(div);

        this.setClients = this.setClients.bind(this);
        this.refresh = this.refresh.bind(this);
        this._attachEventHandlers = this._attachEventHandlers.bind(this)

        this._attachEventHandlers();

        setTimeout(() => {
            Clients.getAll().then((r) => {
                if (r.status == 'success') {
                    this.setClients(r.json.clients);
                } else {
                    notify(r.status, r.message);
                }
            });
        });
    }

    connectedCallback() {
        if (this.isConnected) {
            const self = this;
            const shadow = this.shadowRoot;
        }
    }

    init(container) {
        const show_new = this.hasAttribute('show-new') ? `
            <button type="button" class="btn btn-new" title="New Client">
                <span class="material-icons">create_new_folder</span>
            </button>
            ` : '';


        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                ${show_new}
            </div><!-- .toolbar -->
            <div class="table-wrapper">
                <table class="tbl-clients">
                    <caption>Clients</caption>
                    <colgroup>
                        <col class="col-select">
                        <col class="col-name">
                    </colgroup>
                    <thead>
                        <tr>
                            <th></th>
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

        const btnnew = shadow.querySelector('button.btn-new');
        if (btnnew != null) {
            btnnew.addEventListener('click', function(e) {
                showInTab('client.editor.new', 'New Client', '<client-editor></client-editor>');
            });
        }
    }

    setClients(clients = []) {
        const self = this;
        const shadow = this.shadowRoot;

        const tbody = shadow.querySelector('table tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        clients.forEach((c) => {
            const tds = [];
            tds.push(`<td><input type="radio" id="${c.id}" name="select" class="form-input-radio" value="${c.id}" /></td>`);
            tds.push(`<td><label for="${c.id}">${c.name}</label></td>`);
            const tdall = tds.join('');

            const tr = document.createElement('tr');
            tr.innerHTML = `${tdall}`;

            tbody.appendChild(tr);

            const radio = tr.querySelector('[name=select]');
            radio.addEventListener('change', function(e) {
                self.dispatchEvent(new CustomEvent('selected', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        client: radio.value
                    }
                }));
            });
        });
    }

    refresh() {
        Clients.getAll().then((r) => {
            this.setClients(r.json.clients);
        });
    }
}
customElements.define('clients-table', ClientsTable);
export { ClientsTable };