'use strict';

class ModalDialog extends HTMLElement {

    constructor() {
        self = super();

        const bulma = document.createElement("link");
        bulma.setAttribute('rel', 'stylesheet');
        bulma.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bulma@0.8.2/css/bulma.min.css');

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/css/modal.dialog.css');

        const div = document.createElement('div');
        div.classList.add('modal');
        const content = this.innerHTML;
        div.innerHTML = `
            <div class="modal-background"></div>
            <div class="modal-content">
                ${content}
            </div><!-- .modal-content -->
            <button type="button" id="btnClose" class="modal-close is-large" aria-label="Close"></button>
        `;

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(bulma);
        shadow.appendChild(style);
        shadow.appendChild(div);

        const close = div.querySelector('#btnClose');
        close.addEventListener('click', function(e){
            div.classList.toggle('is-active');
        });

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    connectedCallback() {

    }

    show() {
        const self = this;
        const shadow = this.shadowRoot;
        const modal = shadow.querySelector('div.modal');
        modal.classList.add('is-active');

        return modal;
    }

    hide() {
        const self = this;
        const shadow = this.shadowRoot;
        const modal = shadow.querySelector('div.modal');
        modal.classList.remove('is-active');

        return modal;
    }
}

customElements.define('modal-dialog', ModalDialog);
export { ModalDialog };