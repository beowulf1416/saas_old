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
        console.log('show');

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
    }

    hide() {
        console.log('hide');
        const modalDlgWrapper = document.querySelector('div.modal-dialog-wrapper');
        const dlgWrapper = modalDlgWrapper.querySelector('div.dialog-wrapper');
        dlgWrapper.classList.toggle('modal-show');
    }
}

customElements.define('modal-dialog', ModalDialog);
export { ModalDialog };