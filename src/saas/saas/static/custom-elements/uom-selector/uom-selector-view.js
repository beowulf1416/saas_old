'use strict';
import { Common } from '/static/js/modules/common/common.js';
import { Util } from '/static/js/util.js';
import { notify } from '/static/js/ui/ui.js';
class UomSelectorView extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/uom-selector/uom-selector.css');

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

        this._attachEventHandlers = this._attachEventHandlers.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const div = document.createElement('div');
        div.innerHTML = `
            <form-search id="search"></form-search>
            <div class="table-wrapper">
                <table id="tbl-uoms">
                    <caption>Units of Measure</caption>
                    <colgroup>
                        <col class="select">
                        <col class="name">
                    </colgroup>
                    <thead>
                        <tr>
                            <td scope="col"></td>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div><!-- .table-wrapper -->
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');
        const dimension = this.getAttribute('dimension');

        shadow.getElementById('search').addEventListener('search', function(e) {
            const filter = e.detail.filter;

            Common.uoms(client_id, dimension, filter).then((r) => {
                if (r.status == 'success') {
                    self.setUoms(r.json.uoms, filter);
                } else {
                    notify(r.status, r.message, 3000);
                }
            });
        });
    }

    setUoms(uoms = [], filter = '') {
        const self = this;
        const shadow = this.shadowRoot;

        const tbody = shadow.querySelector('table#tbl-uoms tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        uoms.forEach((u) => {
            const id = 'id' + Util.generateId();
            const uom_name = u.name.replace(filter, `<strong>${filter}</strong>`);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="radio" id="${id}" name="selected" class="form-input-selected" title="Selected" value="${u.id}" data-name="${u.name}" /></td>
                <td><label for="${id}">${uom_name}</label></td>
            `;

            tbody.appendChild(tr);

            // event handlers
            const input_selected = tr.querySelector('.form-input-selected');
            input_selected.addEventListener('change', function() {
                self.dispatchEvent(new CustomEvent('change', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        uom: {
                            id: input_selected.value,
                            name: input_selected.dataset.name
                        }
                    }
                }));
            });
        });
    }
}
customElements.define('uom-selector-view', UomSelectorView);