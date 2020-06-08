'use strict';
import { Clients } from '/static/js/helpers/clients/clients.js';

class ClientSelector extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/client.selector/client.selector.css');

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
}
customElements.define('client-selector', ClientSelector);
export { ClientSelector };