'use strict';

import { AdminClients } from '/static/js/api/admin.clients.js';


class ClientEditor extends HTMLElement {

    constructor() {
        self = super();

        const div = document.createElement('div');
        div.classList.add('container');

        this.initForm(self, div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(div);
    }

    initForm(component, container) {
        const form = document.createElement('form');
        form.classList.add('form-client');
        form.innerHTML = `
            <fieldset class="required">
                <legend>Required</legend>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" title="Name" class="form-input-text" />
                </div><!-- .form-group -->
                <div class="form-group">
                    <label for="address">Address</label>
                    <input type="text" id="address" name="address" title="address" class="form-input-text" />
                </div><!-- .form-group" -->
            </fieldset>
            <fieldset class="actions">
                <button type="button" class="bSave">Save</button>
                <button type="button" class="bCancel">Cancel</button>
            </fieldset>
        `;

        container.appendChild(form);
    }

    connectedCallback() {
        if (this.isConnected) {
            const component = this;
            const shadow = this.shadowRoot;

            const tName = shadow.querySelector('input#name');
            const tAddr = shadow.querySelector('input#address');

            const bSave = shadow.querySelector('.bSave');
            bSave.addEventListener('click', function(e) {
                AdminClients.add(tName.value, tAddr.value, function(e) {
                    console.log(e);
                });
                component.dispatchEvent(new CustomEvent('save', {
                    bubbles: true,
                    cancelable: true
                }));
            });

            const bCancel = shadow.querySelector('.bCancel');
            bCancel.addEventListener('click', function(e) {
                console.log('client editor button cancel clicked');
                component.dispatchEvent(new CustomEvent('cancel', {
                    bubbles: true,
                    cancelable: true
                }));
            });
        }
    }
}

customElements.define('client-editor', ClientEditor);
export { ClientEditor };