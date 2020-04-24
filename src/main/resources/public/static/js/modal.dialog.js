'use strict';

class ModalDialog extends HTMLElement {

    constructor() {
        self = super();

        const inner = this.innerHTML;

        const div = document.createElement('div');
        div.classList.add('modal-dialog-wrapper');

        const dialogWrapper = document.createElement('div');
        dialogWrapper.classList.add('dialog-wrapper');
        dialogWrapper.innerHTML = inner;
        div.appendChild(dialogWrapper);

        this.innerHTML = '';

        const body = document.querySelector('body');
        body.appendChild(div);


        const style = document.createElement('link');
        style.rel = "stylesheet";
        style.href = "/static/css/modal.dialog.css";

        const head = document.querySelector('head');
        head.appendChild(style);
    }

    connectedCallback() {

    }

    show() {
        console.log('show');
        const modalDlgWrapper = document.querySelector('div.modal-dialog-wrapper');
        const dlgWrapper = modalDlgWrapper.querySelector('div.dialog-wrapper');
        dlgWrapper.classList.toggle('modal-show');
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