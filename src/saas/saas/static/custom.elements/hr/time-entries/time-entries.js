'use strict';
import { Util } from '/static/js/util.js';
import { TimeEntries } from '/static/js/modules/hr/time-entries.js';
class TimeEntriesElement extends HTMLElement {

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

        const client_id = this.getAttribute('client-id');

        const btnsave = shadow.getElementById('btn-save');
        btnsave.addEventListener('click', function(e) {
            const trs = shadow.querySelector('table#tbl-times tbody tr');
            entries = [];
            trs.forEach((tr) => {
                const input_start_dt = tr.querySelector('.form-input-start-date');
                const input_start_time = tr.querySelector('.form-input-start-time');
                const input_end_dt = tr.querySelector('.form-input-end-date');
                const input_end_time = tr.querySelector('.form-input-end-time');

                const start = dayjs(`${input_start_dt.value} ${input_start_time.value}`).format();
                const end = dayjs(`${input_end_dt.value} ${input_end_time.value}`).format();
                entries.push({
                    start: start,
                    end: end
                });
            });
            const member_selector = shadow.querySelector('member-selector');
            TimeEntries.save(client_id, member_selector.getSelectedMemberId(), entries);
        });

        const addtimeentry = shadow.getElementById('link-add-time-entry');
        addtimeentry.addEventListener('click', function(e) {
            e.preventDefault();

            const id = Util.generateId();

            let start_date = new Date();
            const last_tr = shadow.querySelector('table#tbl-times tbody tr:last-child');
            if (last_tr != null) {
                const out_date = last_tr.querySelector('.form-input-end-date');
                start_date = new Date(out_date.value);
                start_date.setDate(start_date.getDate() + 1);
            }
            const dateformat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
            const [ {value: month},,{value:day},,{value: year}] = dateformat.formatToParts(start_date);
            const last_date = `${year}-${month}-${day}`;

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

            const date_start = tr.querySelector('.form-input-start-date');
            const date_end = tr.querySelector('.form-input-end-date');
            date_start.addEventListener('change', function(e) {
                date_end.value = date_start.value;
            });

            const time_start = tr.querySelector('.form-input-start-time');
            const time_end = tr.querySelector('.form-input-end-time');
            time_end.addEventListener('change', function(e) {
                const dt_start = dayjs(`${date_start.value} ${time_start.value}`);
                const dt_end = dayjs(`${date_end.value} ${time_end.value}`);
                const hours = dt_end.diff(dt_start, 'hour');

                const input_hours = tr.querySelector('.form-input-hours');
                input_hours.value = hours;
            });
        });
    }
}
customElements.define('time-entries', TimeEntriesElement);