'use strict';

import { NotificationList } from '/static/js/components/notification.list.js';
import { ModalDialog } from '/static/js/components/modal.dialog.js';
import { ItemsTable } from '/static/js/components/inventory/items.table.js';
import { Inventory } from '/static/js/api/inventory.js';

const { fromEvent, from, of } = rxjs;
const {
    debounceTime,
    filter,
    distinctUntilChanged,
    map,
    switchMap,
    tap
} = rxjs.operators;

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
                    <legend>Items</legend>
                    <div class="form-group">
                        <items-table hide-filter show-add hide-active></items-table>
                    </div><!-- .form-group -->
                </fieldset>
                <button type="button" id="btnSave">Save</button>
                <button type="button" id="btnCancel">Cancel</button>
            </form>
            <modal-dialog id="itemsSelect">
                <div class="form-wrapper">
                    <notification-list></notification-list>
                    <form class="form-items-select">
                        <fieldset>
                            <legend>Add Item</legend>
                            <items-table id="itemsSelect" hide-active hide-qty hide-uom></items-table>
                        </fieldset>
                        <button type="button" id="btnSaveSelect">Save</button>
                        <button type="button" id="btnCancelSelect">Cancel</button>
                    </form>
                </div><!-- .form-wrapper -->
            </modal-dialog>
        `;

        container.appendChild(div);

        const bsave = div.querySelector('button#btnSave');
        bsave.addEventListener('click', function(e) {
            console.log('save');
        });

        const bcancel = div.querySelector('button#btnCancel');
        bcancel.addEventListener('click', function(e) {
            console.log('cancel');
        });

        const items = div.querySelector('items-table');
        items.addEventListener('onadditem', function(e) {
            const md = div.querySelector('modal-dialog#itemsSelect');
            const dlg = md.show();

            const n = dlg.querySelector('notification-list');

            const itemsSelect = dlg.querySelector('items-table#itemsSelect');
            fromEvent(itemsSelect, 'onfilteritems')
                .pipe(
                    map(e => e.detail),
                    debounceTime(250),
                    filter(query => query.length > 3),
                    distinctUntilChanged(),
                    switchMap(query => from(Inventory.items(window.variables.currentClient.id, query))),
                    tap(e => {
                        if (e.status == 'success') {
                            const result = JSON.parse(e.json);
                            itemsSelect.setItems(result.items, result.filter);
                        } else {
                            n.error('error', e.message);
                        }
                    })
                )
                .subscribe();

            const bsaveSelect = dlg.querySelector('button#btnSaveSelect');
            bsaveSelect.addEventListener('click', function(e) {
                console.log('bsaveSelect');
                console.log(itemsSelect.getSelectedItems());
                md.hide();
            });

            const bcancelSelect = dlg.querySelector('button#btnCancelSelect');
            bcancelSelect.addEventListener('click', function(e) {
                console.log('bcancelSelect');
                md.hide();
            });
        });
    }
}
customElements.define('receiving-editor', ReceivingEditor);
export { ReceivingEditor };