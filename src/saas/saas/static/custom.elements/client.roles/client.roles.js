'use strict';

class ClientRoles extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/client.roles/client.roles.css');

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
    }

    connectedCallback() {
        if (this.isConnected) {

        }
    }

    init(container) {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="form-wrapper">
                <form class="form-client-role">
                    <label for="search">Client</label>
                    <input type="text" id="client" name="client" title="Client" placeholder="Client" readonly />
                    <button type="button" class="btn btn-client">...</button>
                </form>
            </div><!-- .form-wrapper -->
            <div class="table-wrapper">
                <table class="tbl-roles">
                    <caption>Roles</caption>
                    <colgroup>
                    </colgroup>
                    <thead>
                        <th></th>
                        <th>Name</th>
                        <th>Description></th>
                    </thead>
                    <tbody>
                    </tbody>
                    <tfooter>
                    </tfooter>
                </table>
            </div><!-- .table-wrapper -->
        `;

        container.appendChild(div);

        const btnClient = div.querySelector('button.btn-client');
        btnClient.addEventListener('click', function(e) {
            console.log('//TODO open client selector view');
        });
    }
}
customElements.define('client-roles', ClientRoles);
export { ClientRoles }