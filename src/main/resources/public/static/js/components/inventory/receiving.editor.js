'use strict';

import { ModalDialog } from '/static/js/components/modal.dialog.js';
import { ItemsTable } from '/static/js/components/inventory/items.table.js';

class ReceivingEditor extends HTMLElement {

    constructor() {
        self = super();

        const div = document.createElement('div');
        div.classList.add('wrapper');

        this.initForm(self, div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(div);
    }

    initForm(component, container) {
        const div = document.createElement('div');
        div.classList.add('form-wrapper');
        div.innerHTML = `
            <form class="form-receiving">
                <fieldset>
                    <legend>Details</legend>
                    <div class="form-group">
                        <items-table show-add hide-active></items-table>
                    </div><!-- .form-group -->
                </fieldset>
                <button type="button" id="btnSave">Save</button>
                <button type="button" id="btnCancel">Cancel</button>
            </form>
        `;

        container.appendChild(div);
    }
}
customElements.define('receiving-editor', ReceivingEditor);
export { ReceivingEditor };