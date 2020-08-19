'use strict';
import { showInView } from '/static/js/ui/ui.js';
import { Clients } from '/static/js/modules/admin/clients.js';
class ClientSelector extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/clients/client-selector/client-selector.css');

        const default_style = document.createElement("link");
        default_style.setAttribute('rel', 'stylesheet');
        default_style.setAttribute('href', '/static/css/default.css');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this._init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(default_style);
        shadow.appendChild(div);

        this._attachEventHandlers = this._attachEventHandlers.bind(this);
        this._fetch = this._fetch.bind(this);
        this._attachEventHandlers();
    }

    get value() {
        return this.getAttribute('client-id');
    }

    static get observedAttributes() {
        return ['client-id'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'client-id') {
            this._fetch();
        }
    }

    _init(container) {
        const div = document.createElement('div');
        div.innerHTML = `
            <button type="button" id="btn-select" class="btn btn-select" title="Select Client">
                Select Client
            </button>
        `;
        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        shadow.getElementById('btn-select').addEventListener('click', function() {
            const selector = showInView('Select Client', '<client-selector-view></client-selector-view>');
            selector.addEventListener('selected', function(e) {
                const client_id = e.detail.client.id;
                self.setAttribute('client-id', client_id);
            });
        });
    }

    _fetch() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');
        if (client_id != null) {
            Clients.get(client_id).then((r) => {
                if (r.status == 'success') {
                    const client = r.json.client;
                    shadow.getElementById('btn-select').innerText = client.name;

                    self.dispatchEvent(new CustomEvent('change', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            client: client
                        }
                    }));
                } else {
                    notify(r.status, r.message, 5000);
                }
            });
        }
    }
}
customElements.define('client-selector', ClientSelector);