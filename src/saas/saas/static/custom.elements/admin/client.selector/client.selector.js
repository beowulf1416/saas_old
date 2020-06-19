'use strict';
import { Clients } from '/static/js/helpers/clients/clients.js';
import { notify } from '/static/js/ui/ui.js';

class ClientSelector extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/admin/client.selector/client.selector.css');

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

        this._attachEventHandlers = this._attachEventHandlers.bind(this);

        this._attachEventHandlers();
    }

    connectedCallback() {
        if (this.isConnected) {

        }
    }

    init(container) {
        const self = this;

        const client_id = this.getAttribute('client-id');

        const div = document.createElement('div');
        div.innerHTML = `
            <div class="form-wrapper">
                <form class="form-client-search">
                    <label for="search">Client</label>
                    <input type="search" id="search" name="search" class="form-input-search" title="Search Client" placeholder="Client" />
                    <button type="button" class="btn btn-search">
                        <span class="material-icons">search</span>
                    </button>
                </form>
            </form-wrapper>
            <clients-table></clients-table>
        `;

        container.appendChild(div);

        const clientsTbl = div.querySelector('clients-table');
        clientsTbl.addEventListener('selected', function(e) {
            self.dispatchEvent(new CustomEvent('selected', {
                bubbles: true,
                cancelable: true,
                detail: e.detail
            }));
        });
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const search = shadow.querySelector('button.btn-search');
        search.addEventListener('click', function(e) {
            const filter = shadow.querySelector('input#search');
            Clients.filter(filter.value).then((r) => {
                if (r.status == 'success') {
                    const clientsTbl = shadow.querySelector('clients-table');
                    clientsTbl.setClients(r.json.clients);
                } else {
                    notify(r.status, r.message);
                }
            });
        });
    }
}
customElements.define('client-selector', ClientSelector);
export { ClientSelector };