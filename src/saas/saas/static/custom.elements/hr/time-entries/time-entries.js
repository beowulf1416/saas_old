'use strict';

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
    }

    _init(container) {
        const self = this;

        const client_id = this.getAttribute('client-id');

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
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
                                    <th scope="col" colspan="2">Shift 1</th>
                                    <th scope="col" colspan="2">Shift 2</th>
                                    <th scope="col" colspan="2">Shift 3</th>
                                </tr>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">IN</th>
                                    <th scope="col">OUT</th>
                                    <th scope="col">IN</th>
                                    <th scope="col">OUT</th>
                                    <th scope="col">IN</th>
                                    <th scope="col">OUT</th>
                                </tr>
                            </thead>
                            <tfoot>
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
customElements.define('time-entries', TimeEntries);