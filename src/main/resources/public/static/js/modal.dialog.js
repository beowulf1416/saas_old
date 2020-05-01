'use strict';

class ModalDialog extends HTMLElement {

    constructor() {
        self = super();

        const style = document.createElement('link');
        style.rel = "stylesheet";
        style.href = "/static/css/modal.dialog.css";

        const head = document.querySelector('head');
        head.appendChild(style);

        // this.shadowQuerySelector = this.shadowQuerySelector.bind(this);
        this.show = this.show.bind(this);
    }

    connectedCallback() {

    }

    show() {
        const body = document.querySelector('body');

        const dialog = document.createElement('div');
        dialog.classList.add('dialog-wrapper');
        dialog.innerHTML = this.innerHTML;

        const wrapper = document.createElement('div');
        wrapper.classList.add('modal-wrapper');
        wrapper.appendChild(dialog);
        wrapper.addEventListener('click', function(e) {
            // hide dialog if wrapper is clicked
            if (e.target == this) {
                body.removeChild(this);
            }
        });

        body.appendChild(wrapper);

        return wrapper;
    }

    hide() {
        const body = document.querySelector('body');
        const wrapper = document.querySelector('div.modal-wrapper');
        body.removeChild(wrapper);
    }
}

customElements.define('modal-dialog', ModalDialog);
export { ModalDialog };