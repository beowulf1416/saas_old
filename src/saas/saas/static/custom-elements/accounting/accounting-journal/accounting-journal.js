'use strict';
class AccountingJournal extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/accounting/accounting-journal/accounting-journal.css');

        const default_style = document.createElement("link");
        default_style.setAttribute('rel', 'stylesheet');
        default_style.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons');

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
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button type="button" id="btn-save" class="btn btn-save" title="Save Journal Entry">
                    <span class="material-icons">save</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form id="form-journals">
                    <label for="particulars">Particulars</label>
                    <textarea id="particulars" name="particulars" title="Particulars" class="form-input-particulars"></textarea>

                    <div class="table-wrapper">
                        <table id="tbl-entries">
                            <caption>Journal Entries</caption>
                            <colgroup>
                                <col class="addremove">
                                <col class="account">
                                <col class="amount">
                            </colgroup>
                            <thead>
                                <tr>
                                    <td></td>
                                    <th scope="col">Account</th>
                                    <th scope="col">Amount</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td>Total</td>
                                    <td></td>
                                </tr>
                            </tfoot>
                            <tbody>
                            </tbody>
                        </table>
                    </div><!-- .table-wrapper -->
                </form>
            </div><!-- .form-wrapper -->
        `;
        container.appendChild(div);
    }
}
customElements.define('accounting-journal', AccountingJournal);