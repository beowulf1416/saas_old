'use strict';
class AccountingJournals extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/accounting/accounting-journals/accounting-journals.css');

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
                <button type="button" id="btn-new" class="btn btn-new" title="New Journal Entry">
                    <span class="material-icons">new</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form id="form-journals">
                    <label for="filter">Find</label>
                    <input type="search" id="filter" name="filter" class="form-input-filter" title="Filter" placeholder="Find" />
                    <button type="button" id="btn-filter" class="btn btn-filter" title="Filter">
                        <span class="material-icons">search</span>
                    </button>
                </form>
            </div><!-- .form-wrapper -->
            <div class="table-wrapper">
                <table id="tbl-journals">
                    <caption>Accounting Journals</caption>
                    <colgroup>
                        <col class="edit">
                        <col class="particulars">
                        <col class="date">
                    </colgroup>
                    <thead>
                        <tr>
                            <td scope="col"></td>
                            <th scope="col">Particulars</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div><!-- .table-wrapper -->
        `;
        container.appendChild(div);
    }
}
customElements.define('accounting-journals', AccountingJournals);