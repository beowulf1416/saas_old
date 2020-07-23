'use strict';
import { Journal } from '/static/js/modules/accounting/journal.js';
import { notify } from '/static/js/ui/ui.js';
import { Util } from '/static/js/util.js';
class AccountingJournal extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/accounting/accounting-journal/accounting-journal.css');

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
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button type="button" id="btn-save" class="btn btn-save" title="Save Journal Entry">
                    <span class="material-icons">save</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form id="form-journals">
                    <fieldset id="general">
                        <!-- description -->
                        <label for="description">Description</label>
                        <textarea id="description" name="description" title="Description" class="form-input-description"></textarea>

                        <!-- currency -->
                        <label for="currency">Currency</label>
                        <currency-selector id="currency"></currency-selector>
                    </fieldset>

                    <fieldset id="entries">
                        <div class="table-wrapper">
                            <table id="tbl-entries">
                                <caption>Journal Entries</caption>
                                <colgroup>
                                    <col class="addremove">
                                    <col class="account">
                                    <col class="debit">
                                    <col class="credit">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <td></td>
                                        <th scope="col">Account</th>
                                        <th scope="col">Debit</th>
                                        <th scope="col">Credit</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <td><a id="link-add" class="link-add" title="Add" href="#">&plus;</a></td>
                                        <td>Total</td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                                <tbody>
                                </tbody>
                            </table>
                        </div><!-- .table-wrapper -->
                    </fieldset>
                    <fieldset id="references">
                        <div class="table-wrapper">
                            <table id="tbl-refs">
                                <caption>References</caption>
                                <colgroup>
                                </colgroup>
                                <tfoot>
                                    <tr>
                                        <td><a id="link-add-ref" class="link-add-ref" title="Add Reference" href="#">&plus;</a></td>
                                    </tr>
                                </tfoot>
                                <tbody>
                                </tbody>
                            </table>
                        </div><!-- .table-wrapper -->
                    </fieldset>

                    <input type="file" 
                        id="file" 
                        name="file" 
                        class="form-input-file sr-only" 
                        title="Add File Reference"
                        accept="image/*,.pdf,.txt,.doc,.docx,.xl*,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        multiple 
                    />
                </form>
            </div><!-- .form-wrapper -->
        `;
        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        const btnsave = shadow.getElementById('btn-save');
        btnsave.addEventListener('click', function() {
            const input_desc = shadow.getElementById('description');
            const input_currency = shadow.getElementById('currency');

            const entries = [];
            shadow.querySelectorAll('table#tbl-entries tbody tr').forEach((tr) => {
                const input_acct = tr.querySelector('account-selector');
                const input_debit = tr.querySelector('.form-input-debit');
                const input_credit = tr.querySelector('.form-input-credit');

                entries.push({
                    accountId: input_acct.value(),
                    debit: input_debit.value,
                    credit: input_credit.value
                });
            });

            const files = [];
            const refs = shadow.querySelectorAll('table#tbl-refs tbody tr');
            refs.forEach((ref) => {
                const filename = ref.dataset.filename;
                const type = ref.dataset.type;
                const size = ref.dataset.size;
                const data = ref.dataset.url;

                files.push({
                    id: Util.generateUUID(),
                    filename: filename,
                    type: type,
                    size: size,
                    data: data
                })
            });
            // shadow.querySelectorAll('.form-input-file').forEach((n) => {
            //     for(let i = 0; i < n.files.length; i++) {
            //         const f = n.files[i];

            //         files.push({
            //             id: Util.generateUUID(),
            //             filename: f.name,
            //             type: f.type,
            //             size: f.size
            //         });
            //     }
            // });

            Journal.add({
                clientId: client_id,
                description: input_desc.value,
                currencyId: input_currency.value(),
                entries: entries,
                files: files
            }).then((r) => {
                notify(r.status, r.message, 3000);
            });
        });

        const linkadd = shadow.getElementById('link-add');
        linkadd.addEventListener('click', function(e) {
            e.preventDefault();

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><a class="link-remove" title="Remove" href="#">&minus;</a></td>
                <td><account-selector client-id="${client_id}"></account-selector></td>
                <td><input type="number" name="debit" class="form-input-debit" title="Debit" /></td>
                <td><input type="number" name="credit" class="form-input-credit" title="Credit" /></td>
            `;

            const tbody = shadow.querySelector('table#tbl-entries tbody');
            tbody.appendChild(tr);

            // event handlers
            const linkremove = tr.querySelector('.link-remove');
            linkremove.addEventListener('click', function(e) {
                e.preventDefault();

                const parent_tr = linkremove.parentElement.parentElement;
                parent_tr.classList.toggle('remove');
            });
        });

        const linkaddref = shadow.getElementById('link-add-ref');
        linkaddref.addEventListener('click', function(e) {
            e.preventDefault();

            const input_file = shadow.getElementById('file');
            input_file.click();
        });

        const input_file = shadow.getElementById('file');
        input_file.addEventListener('change', function() {
            const selected = input_file.files;
            if (selected.length > 0) {
                const read_file = function(file) {

                    const filename = file.name;
                    const type = file.type;
                    const size = file.size;

                    const reader = new FileReader();
                    reader.addEventListener('load', function() {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td><a class="link-remove-ref" title="Remove File" href="#">&minus;</a></td>
                            <td>
                                <img src="${reader.result}" alt="${filename}" height="100px" width="100px"  />
                                <span>${filename}</span>
                            </td>
                        `;
                        tr.dataset.filename = filename;
                        tr.dataset.type = type;
                        tr.dataset.size = size;
                        tr.dataset.url = reader.result;

                        const tbody = shadow.querySelector('table#tbl-refs tbody');
                        tbody.appendChild(tr);

                        // event handlers
                        const linkremoveref = tr.querySelector('.link-remove-ref');
                        linkremoveref.addEventListener('click', function(e) {
                            e.preventDefault();

                            const parent_tr = linkremoveref.parentElement.parentElement;
                            tbody.removeChild(parent_tr);
                        });
                    });
                    reader.readAsDataURL(file);
                };

                for(let i = 0; i < selected.length; i++) {
                    const file = selected[i];
                    read_file(file);
                }
            }
        });
    }
}
customElements.define('accounting-journal', AccountingJournal);