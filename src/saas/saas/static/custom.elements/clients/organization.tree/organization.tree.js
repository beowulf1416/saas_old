'use strict';
import { notify, showInTab } from '/static/js/ui/ui.js';
class OrganizationTree extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/clients/organization.tree/organization.tree.css');

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
    }

    _init(container) {
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button id="btn-new" type="button" class="btn btn-new" title="New Organization">
                    <span class="material-icons">account_tree</span>
                </button>
                <button id="btn-refresh" type="button" class="btn btn-refresh" title="Refresh">
                    <span class="material-icons">refresh</span>
                </button>
            </div><!-- .toolbar -->
            <div class="table-wrapper">
                <table class="tbl-org-tree" role="treegrid">
                    <caption>Organizational Tree</caption>
                    <colgroup>
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="name"></th>
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
        
        const client_id = this.getAttribute('client-id');

        const btnnew = shadow.getElementById('btn-new');
        btnnew.addEventListener('click', function(e) {
            showInTab('organization-editor', 'New Organization', `<organization-editor client-id="${client_id}"></organization-editor>`);
        });
    }
}
customElements.define('organization-tree', OrganizationTree);