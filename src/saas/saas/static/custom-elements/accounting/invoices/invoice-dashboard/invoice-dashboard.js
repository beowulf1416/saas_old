'use strict';
class InvoiceDashboard extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/accounting/invoices/invoice-dashboard/invoice-dashboard.css');

        const default_style = document.createElement("link");
        default_style.setAttribute('rel', 'stylesheet');
        default_style.setAttribute('href', '/static/css/default.css');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this._init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(default_style);
        shadow.appendChild(div);
    }

    _init(container) {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <nav aria-label="Actions">
                    <ul id="menu-bar-1"
                        class="menu-bar"
                        role="menubar"
                        aria-label="Actions">
                        <li role="none">
                            <a class="menu-item"
                                role="menuitem"
                                href="#"
                                tabindex="0"
                                aria-haspopup="true"
                                aria-expanded="false">
                                <span>New Invoice</span>
                            </a>
                            <ul role="menu"
                                class="menu"
                                aria-label="Invoice Types">
                                <li role="none">
                                    <a class="menu-item"
                                        role="menuitem"
                                        href="#">
                                        <span>Sales Invoice</span>
                                    </a>
                                </li>
                                <li role="none">
                                    <a class="menu-item"
                                        role="menuitem"
                                        href="#">
                                        <span>Purchase Invoice</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul><!-- #menu-bar-1 -->
                </nav>
            </div><!-- .toolbar -->
        `;

        container.appendChild(div);
    }
}
customElements.define('invoice-dashboard', InvoiceDashboard);