'use strict';

import { ModalDialog } from '/static/js/components/modal.dialog.js';
import { NotificationList } from '/static/js/components/notification.list.js';

class AccountSelector extends HTMLElement {

    constructor() {
        self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/css/account.selector.css');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this.init(self, div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(div);
    }

    init(component, container) {
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="form-wrapper">
                <form class="account-selector">
                    <fieldset>
                        <label for="account">Account</label>
                        <input type="text" id="account" name="account" class="form-input-text form-input-account" title="Account" placeholder="Account" />
                    </fieldset>
                    <button type="button" id="search" class="btn btn-search">Search</button>
                </form><!-- .account-selector -->
            </div><!-- .form-wrapper -->
            <modal-dialog>
                <div class="form-wrapper">
                    <notiication-list></notification-list>
                    <form class="selector-wrapper">
                        <fieldset>
                            <div class="form-group">
                                <label for="account">Account</label>
                                <input type="search" id="search" name="search" class="form-input-search" title="Account" placeholder="Account" />
                            </div><!-- .form-group -->
                            <button type="button" id="btnSelect" class="btn btn-primary">Select</button>
                        </fieldset>
                    </form>
                </div><!-- .form-wrapper -->
            </modal-dialog>
        `;

        container.appendChild(div);

        const md = div.querySelector('modal-dialog');
        const btnsearch = div.querySelector('button#search');
        btnsearch.addEventListener('click', function(e) {
            const dlg = md.show();
        });
        
    }


}
customElements.define('account-selector', AccountSelector);
export { AccountSelector };