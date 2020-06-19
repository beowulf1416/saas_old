'use strict';
import { Clients } from '/static/js/modules/admin/clients.js';
import { showInTab, notify } from '/static/js/ui/ui.js';

class ClientsTable extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/admin/clients.table/clients.table.css');

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
        this.refresh = this.refresh.bind(this);

        setTimeout(() => {
            self.refresh();
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
                <button type="button" class="btn btn-refresh">
                    <span class="material-icons">refresh</span>
                </button>
            </div><!-- .toolbar -->
            <div class="table-wrapper">
                <table class="tbl-clients">
                    <caption>Clients</caption>
                    <colgroup>
                        <col class="col-select">
                        <col class="col-edit">
                        <col class="col-name">
                    </colgroup>
                    <thead>
                        <tr>
                            <th></th>
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

        const btnrefresh = shadow.querySelector('button.btn-refresh');
        btnrefresh.addEventListener('click', function(e) {
            self.refresh();
        });
    }

    setClients(clients = []) {
        const self = this;
        const shadow = this.shadowRoot;

        const show_edit = this.hasAttribute('show-edit');

        const tbody = shadow.querySelector('table tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        clients.forEach((c) => {
            const tds = [];
            tds.push(`<td><input type="radio" id="${c.id}" name="select" class="form-input-radio" value="${c.id}" /></td>`);
            if (show_edit) {
                tds.push(`<td><a class="link-edit" title="Edit" href="#" data-clientid="${c.id}" data-clientname="${c.name}"><span class="material-icons">edit</span></a></td>`);
            }
            tds.push(`<td><label for="${c.id}">${c.name}</label></td>`);
            const tdall = tds.join('');

            const tr = document.createElement('tr');
            tr.innerHTML = `${tdall}`;

            tbody.appendChild(tr);

            // attach event handlers
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

            if (show_edit) {
                const edit = tr.querySelector('.link-edit');
                edit.addEventListener('click', function(e) {
                    const client_id = edit.dataset.clientid;
                    const client_name = edit.dataset.clientname;

                    showInTab(client_id, `Client ${client_name}`, `<client-editor client-id="${client_id}"></client-editor>`)
                });
            }
        });
    }

    refresh() {
        Clients.getAll().then((r) => {
            if (r.status == 'success') {
                this.setClients(r.json.clients);
            } else {
                notify(r.status, r.message);
            }
        });
    }
}
customElements.define('clients-table', ClientsTable);
export { ClientsTable };