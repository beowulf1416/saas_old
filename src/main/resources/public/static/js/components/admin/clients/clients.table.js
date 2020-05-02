'use strict';

import { AdminClients } from '/static/js/api/admin.clients.js';


class AdminClientsTable extends HTMLElement {

    constructor() {
        self = super();

        const container = document.createElement('div');
        container.classList.add('client-list-container');

        this.initTable(self, container);

        this.refresh = this.refresh.bind(this);
        this.refresh();

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(container);
    }
    
    connectedCallback() {
        if (this.isConnected) {
            const self = this;
            const shadow = this.shadowRoot;
        }
    }

    initTable(component, container) {
        const div = document.createElement('div');
        div.classList.add('tbl-wrapper');
        div.innerHTML = `
            <table class="clients">
                <caption>Clients</caption>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table><!-- .clients -->
        `;

        container.append(div);
    }

    refresh() {
        const self = this;
        AdminClients.all(function(e) {
            if (e && e.status == 'success') {
                const data = JSON.parse(e.json);
                if (Array.isArray(data)) {
                    const shadow = self.shadowRoot;
                    const tbl = shadow.querySelector('table.clients tbody');
                    while(tbl.firstChild) {
                        tbl.removeChild(tbl.lastChild);
                    }

                    const clients = data;
                    clients.forEach(client => {
                        const tr = document.createElement('tr');
                        tr.classList.add('client-row');
                        tr.innerHTML = `
                            <td></td>
                            <td>
                                <a class="nav-link client-row-link" title="${client.name}" data-id="${client.id}" href="#">
                                    ${client.name}
                                </a>
                            </td>
                        `;

                        tbl.appendChild(tr);
                    });

                    const tr = document.createElement('tr');
                    tr.classList.add('client-add');
                    tr.innerHTML = `
                        <td>
                            <a  id="lAdd" class="nav-link client-row-add" title="Add Client" href="#">Add</a>
                        </td>
                    `;

                    const lAdd = tr.querySelector('a#lAdd');
                    lAdd.addEventListener('click', function(e) {
                        self.dispatchEvent(new CustomEvent('onaddclient', {
                            bubbles: true,
                            cancelable: true
                        }));
                    });

                    tbl.appendChild(tr);

                } else {
                    console.error('unexpected data');
                }
            } else {
                console.error(e);
            }
        });
    }
}

customElements.define('clients-table', AdminClientsTable);
export { AdminClientsTable };