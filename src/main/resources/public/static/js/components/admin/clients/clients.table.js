'use strict';

import { Util } from '/static/js/util.js';


class AdminClientsTable extends HTMLElement {

    constructor() {
        self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/css/clients/clients.table.css');

        const container = document.createElement('div');
        container.classList.add('client-list-container');

        this.initTable(self, container);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(container);

        this.setClients = this.setClients.bind(this);
    }
    
    connectedCallback() {
        if (this.isConnected) {
            const self = this;
            const shadow = this.shadowRoot;
        }
    }

    initTable(component, container) {
        const classActive = this.hasAttribute('hide-active') ? "col-active col-hidden" : "col-active";
        const showAdd = this.hasAttribute('show-add');

        const div = document.createElement('div');
        div.classList.add('tbl-wrapper');
        div.innerHTML = `
            <table class="tbl-clients">
                <caption>Clients</caption>
                <thead>
                    <tr>
                        <th class="col-select"></th>
                        <th class="${classActive}">Active</th>
                        <th class="col-name">Name</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table><!-- .clients -->
        `;

        container.append(div);

        if (showAdd) {
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

            const tbl = container.querySelector('table.tbl-clients tbody');
            tbl.appendChild(tr);
        }
    }

    setClients(clients, options) {
        const self = this;

        const multiselect = this.hasAttribute('multiselect');
        const showAdd = this.hasAttribute('show-add');

        const classActive = this.hasAttribute('hide-active') ? "col-active col-hidden" : "col-active";
        const className = "col-name";

        if (Array.isArray(clients)) {
            const shadow = self.shadowRoot;

            const tbl = shadow.querySelector('table.tbl-clients tbody');
            while(tbl.firstChild) {
                tbl.removeChild(tbl.lastChild);
            }

            clients.forEach(client => {
                let id = Util.generateId();
                const tr = document.createElement('tr');
                tr.classList.add('client-row');

                let tds = [];

                if (multiselect) {
                    tds.push(`<td class="col-select"><input type="checkbox" name="clientSelect" title="Select Client" class="form-input-check client-select" value="${client.id}" /></td>`);
                } else {
                    tds.push(`<td class="col-select"><input type="radio" name="clientSelect" title="Select Client" class="form-input-radio client-select" value="${client.id}" /></td>`);
                }

                tds.push(`<td class="${classActive}"><a title="Toggle Active" class="nav-link client-link-active" href="#active${id}" data-id="${client.id}" data-active="${client.active}">${client.active}</a></td>`);
                tds.push(`<td class="${className}"><a title="${client.name}" class="nav-link client-row-link" title="${client.name}" href="#select${id}" data-id="${client.id}">${client.name}</a></td>`)

                tr.innerHTML = tds.join('');
                tbl.appendChild(tr);

                const lClient = tr.querySelector('a.client-row-link');
                lClient.addEventListener('click', function(e) {
                    self.dispatchEvent(new CustomEvent('onselectclient', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            clientId: lClient.dataset.id
                        }
                    }));
                });

                const radio = tr.querySelector('input.client-select');
                radio.addEventListener('change', function(e) {
                    self.dispatchEvent(new CustomEvent('onselectclient', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            clientId: radio.value
                        }
                    }));
                });

                
                const lActive = tr.querySelector('a.client-link-active');
                lActive.addEventListener('click', function(e) {
                    self.dispatchEvent(new CustomEvent('onupdateclientactive', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            clientId: lActive.dataset.id,
                            active: lActive.dataset.active
                        }
                    }));
                });
            });

            if (showAdd) {
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
            }
        } else {
            self.dispatchEvent(new CustomEvent('onerror', {
                bubbles: true,
                cancelable: true
            }));
        }
    }
}

customElements.define('clients-table', AdminClientsTable);
export { AdminClientsTable };