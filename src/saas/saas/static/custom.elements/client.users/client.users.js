'use strict';

class ClientUsers extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/client.users/client.users.css');

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
    }

    _init(container) {
        const self = this;
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button type="button" class="btn btn-refresh" title="Refresh">
                    <span class="material-icons">refresh</span>
                </button>
                <button type="button" class="btn btn-user-add" title="Create a new role">
                    <span class="material-icons">group_add</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form class="form-client-user">
                    <input type="hidden" id="client_id" name="client_id" value="" />

                    <!-- client -->
                    <label for="client">Client</label>
                    <input type="text" id="client" name="client" title="Client" placeholder="Client" readonly />
                    <button type="button" class="btn btn-client">...</button>
                </form>
            </div><!-- .form-wrapper -->
            <div class="table-wrapper">
                <table class="tbl-users">
                    <caption>Users</caption>
                    <colgroup>
                    </colgroup>
                    <thead>
                        <th></th>
                        <th>Active</th>
                        <th>Name</th>
                    </thead>
                    <tbody>
                    </tbody>
                    <tfooter>
                        <tr>
                            <td><a title="Add User" class="link-user-add" href="#">&plus;</a></td>
                        </tr>
                    </tfooter>
                </table>
                <table class="tbl-roles">
                    <caption>Roles</caption>
                    <colgroup>
                    </colgroup>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    <tfooter>
                        <tr>
                            <td><a title="Add Role" class="link-role-add" href="#">&plus;</a></td>
                        </tr>
                    </tfooter>
                </table>
            </div><!-- .table-wrapper -->
        `;

        container.appendChild(div);
    }
}
customElements.define('client-users', ClientUsers);
export { ClientUsers };