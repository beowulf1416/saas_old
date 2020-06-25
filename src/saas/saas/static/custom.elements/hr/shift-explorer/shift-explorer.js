'use script';
import { notify, showInTab } from '/static/js/ui/ui.js';
import { Shifts } from '/static/js/modules/hr/shifts.js';
class ShiftExplorer extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/hr/shift-explorer/shift-explorer.css');

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
        this.setShifts = this.setShifts.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button type="button" id="btn-new" class="btn btn-new" title="New Shift">
                    <span class="material-icons">note_add</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form id="form-filter">
                    <label for="filter">Shift</label>
                    <input type="search" id="filter" name="filter" class="form-input-filter" title="Search for Shift" placeholder="Shift" />
                    <button type="button" id="btn-filter" class="btn btn-filter" title="Search">
                        <span class="material-icons">search</span>
                    </button>
                </form>
            </div><!-- .form-wrapper -->
            <div class="table-wrapper">
                <table id="tbl-shifts">
                    <caption>Shifts</caption>
                    <colgroup>
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tfoot>
                    </tfoot>
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

        const btnnew = shadow.getElementById('btn-new');
        btnnew.addEventListener('click', function(e) {
            showInTab('shift-editor', 'New Shift', `<shift-editor client-id="${client_id}"></shift-editor>`);
        });

        const beginsearch = function(filter) {
            Shifts.filter(client_id, filter).then((r) => {
                if (r.status == 'success') {
                    const shifts = r.json.shifts;
                    self.setShifts(shifts, filter);
                } else {
                    notify(r.status, r.message);
                }
            });
        };

        const filter = shadow.getElementById('filter');
        filter.addEventListener('keyup', function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();

                beginsearch(filter.value);
            }
        });

        const btnfilter = shadow.getElementById('btn-filter');
        btnfilter.addEventListener('click', function(e) {
            beginsearch(filter.value);
        });
    }

    setShifts(shifts = [], filter = '') {
        const self = this;
        const shadow = this.shadowRoot;

        const tbody = shadow.querySelector('table#tbl-shifts tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }

        shifts.forEach((s) => {
            const id = s.id;
            const name = s.name;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <a class="link-edit-shift" title="Edit Shift" href="#">
                        <span class="material-icons">edit</span>
                    </a>
                </td>
                <td>${name}</td>
            `;

            tbody.appendChild(tr);

            // event handlers
        });
    }
}
customElements.define('shift-explorer', ShiftExplorer);