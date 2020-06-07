'use strict';

class ClientsTable extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/custom.elements/clients.table.css');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this.init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(div);
    }

    connectedCallback() {
        if (this.isConnected) {

        }
    }

    init(container) {
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="table-wrapper">
                <div class="toolbar" role="toolbar">
                </div><!-- .toolbar -->
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
}
customElements.define('clients-table', ClientsTable);
export { ClientsTable };