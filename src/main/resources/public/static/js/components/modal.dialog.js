'use strict';

class ModalDialog extends HTMLElement {

    constructor() {
        self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bulma@0.8.2/css/bulma.min.css');

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
        shadow.appendChild(style);
        shadow.appendChild(div);

        const close = div.querySelector('#btnClose');
        close.addEventListener('click', function(e){
            div.classList.toggle('is-active');
        });

        this.show = this.show.bind(this);
    }

    connectedCallback() {

    }

    show() {
        const self = this;
        const shadow = this.shadowRoot;
        const modal = shadow.querySelector('div.modal');
        modal.classList.toggle('is-active');

        return modal;
    }

    hide() {
        const body = document.querySelector('body');
        const wrapper = document.querySelector('div.modal-wrapper');
        body.removeChild(wrapper);
    }
}

customElements.define('modal-dialog', ModalDialog);
export { ModalDialog };