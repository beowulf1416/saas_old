'use strict';

class MemberSelectorView extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/hr/member-selector/member-selector-view.css');

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
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="form-wrapper">
                <label for="filter">Member</label>
                <input type="search" id="filter" name="filter" class="form-input-filter" title="Search for Member" placeholder="Member" />
                <button type="button" id="btn-filter" class="btn btn-filter title="Search">
                    <span class="material-icons">search</span>
                </button> 
            </div><!-- .form-wrapper -->
            <div class="table-wrapper">
                <table id="tbl-members">
                    <caption>Members</caption>
                    <colgroup>
                        <col class="select">
                        <col class="name">
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
}
customElements.define('member-selector-view', MemberSelectorView);