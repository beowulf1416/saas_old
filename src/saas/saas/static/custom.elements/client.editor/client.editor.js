'use strict';

class ClientEditor extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/client.editor/client.editor.css');

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

        this._attachEventHandler = this._attachEventHandler.bind(this);
    }

    _init(container) {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="form-wrapper">
                <div class="toolbar" role="toolbar">
                    <button type="button" class="btn btn-save">
                        <span class="material-icons">save</span>
                    </button>
                </div><!-- .toolbar -->
                <form class="form-client-editor">
                    <!-- name -->
                    <label for="name">Name</label>
                    <div class="form-group form-group-name">
                        <input type="text" id="name" name="name" class="form-input-name" title="Client Name" placeholder="Name" />
                    </div><!-- .form-group -->

                    <!-- address -->
                    <label for="address">Address</label>
                    <div class="form-group form-group-address">
                        <textarea id="address" name="address" class="form-input-address" title="Address" placeholder="Address">
                        </textarea>
                    </div><!-- .form-group -->
                </form>
            </div><!-- .form-wrapper -->
        `;

        container.appendChild(div)
    }

    _attachEventHandler() {
        const self = this;
        const shadow = this.shadowRoot;

        const btnsave = shadow.querySelector('button.btn-save');
        btnsave.addEventListener('click', function(e) {
            console.log('save');
        });
    }
}
customElements.define('client-editor', ClientEditor);
export { ClientEditor };