'use strict';
class OrganizationExplorer extends HTMLElement {

    constructor() {
        const self = super();
        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/inventory/organization-explorer/organization-explorer.css');

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
        this.setOrganizations = this.setOrganizations.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button type="button" id="btn-new" class="btn btn-new" title="New Organization">
                    <span class="material-icons">business</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form id="form-filter">
                    <label for="filter">Organizations</label>
                    <input type="search" id="filter" name="filter" class="form-input-filter" title="Search for Organizations" placeholder="Search" />
                    <button type="button" id="btn-filter" class="btn btn-filter" title="Search">
                        <span class="material-icons">search</span>
                    </button>
                </form>
            </div><!-- .form-wrapper -->
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        const beginsearch = function(filter) {
            console.log('// TODO');
        };

        const filter = shadow.getElementById('filter');
        filter.addEventListener('keyup', function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();

                beginsearch(client_id, filter.value);
            }
        });

        const btnfilter = shadow.getElementById('btn-filter');
        btnfilter.addEventListener('click', function(e) {
            beginsearch(client_id, filter.value);
        });

        const btnnew = shadow.getElementById('btn-new');
        btnnew.addEventListener('click', function(e) {
            console.log('//TODO');
        });
    }

    setOrganizations(orgs = [], filter = '') {
        const self = this;
        const shadow = this.shadowRoot;


    }
}
customElements.define('organization-explorer', OrganizationExplorer);