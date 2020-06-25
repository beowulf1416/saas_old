'use strict';
import { Util } from '/static/js/util.js';
class TimeEntries extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/hr/time-entries/time-entries.css');

        const google_web_fonts = document.createElement("link");
        google_web_fonts.setAttribute('rel', 'stylesheet');
        google_web_fonts.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this._init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(google_web_fonts);
        shadow.appendChild(div);

        this._attachEventHandlers = this._attachEventHandlers.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const self = this;

        const client_id = this.getAttribute('client-id');

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button type="button" id="btn-save" class="btn btn-save" title="Save">
                    <span class="material-icons">save</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form id="form-times">
                    <member-selector client-id="${client_id}"></member-selector>
                    <div class="table-wrapper">
                        <table id="tbl-times">
                            <caption>Time Entries</caption>
                            <colgroup>
                                <col class="addremove">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col" colspan="2">IN</th>
                                    <th scope="col" colspan="2">OUT</th>
                                    <th scope="col">Hours</th>
                                </tr>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Hours</th>
                                </td>
                            </thead>
                            <tfoot>
                                <tr>
                                    <td>
                                        <a id="link-add-time-entry" class="link-add-time-entry" href="#" title="Add Time Entry">&plus;</a>
                                    </td>
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

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const btnsave = shadow.getElementById('btn-save');
        btnsave.addEventListener('click', function(e) {
            console.log('//TODO save');
        });

        const addtimeentry = shadow.getElementById('link-add-time-entry');
        addtimeentry.addEventListener('click', function(e) {
            e.preventDefault();

            const id = Util.generateId();

            let start_date = moment();
            const last_tr = shadow.querySelector('table#tbl-times tbody tr:last-child');
            if (last_tr != null) {
                const out_date = last_tr.querySelector('.form-input-end-date');
                start_date = moment(out_date.value).add(1, 'days');
            }
            const last_date = start_date.format('dd/mm/yyyy');

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <a class="link-remove" title="Remove Time Entry" href="#">&minus;</a>
                </td>
                <td><input type="date" name="in_date" class="form-input-start-date" title="Start Date" value="${last_date}" /></td>
                <td><input type="time" name="in_time" class="form-input-start-time" title="Start Time" /></td>
                <td><input type="date" name="out_date" class="form-input-end-date" title="End Date" value="${last_date}" /></td>
                <td><input type="time" name="out_time" class="form-input-end-time" title="End Time" /></td>
                <td><input type="number" name="hours" class="form-input-hours" title="Hours" readonly  /></td>
            `;

            const tbody = shadow.querySelector('table#tbl-times tbody');
            tbody.appendChild(tr);

            // event handlers
            const remove = tr.querySelector('.link-remove');
            remove.addEventListener('click', function(e) {
                e.preventDefault();

                const parent_tr = remove.parentElement.parentElement;
                tbody.removeChild(parent_tr);
            });
        });
    }
}
customElements.define('time-entries', TimeEntries);