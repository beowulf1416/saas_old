'use strict';

class MemberEditor extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/hr/member.editor/member.editor.css');

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
        const client_id = this.getAttribute('client-id');

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button id="btn-save" type="button" class="btn btn-save" title="Save">
                    <span class="material-icons">save</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form class="form-member">
                    <input type="hidden" id="client-id" name="client_id" value="${client_id}" />

                    <div class="form-group form-group-name">
                        <!-- first name -->
                        <label for="first-name">First Name</label>
                        <input type="text" id="first-name" name="first_name" class="form-input-first" title="First Name" placeholder="First Name" />

                        <!-- middle name -->
                        <label for="middle-name">Middle Name</label>
                        <input type="text" id="middle-name" name="middle_name" class="form-input-middle" title="Middle Name" placeholder="Middle Name" />

                        <!-- last name -->
                        <label for="last-name">Last Name</label>
                        <input type="text" id="last-name" name="last_name" class="form-input-last" title="Last Name" placeholder="Last Name" />
                    </div><!-- .form-group -->

                    <!-- prefix -->
                    <label for="prefix">Prefix</label>
                    <input type="text" id="prefix" name="prefix" class="form-input-prefix" title="Prefix" placeholder="Prefix" />

                    <!-- suffix -->
                    <label for="suffix">Suffix</label>
                    <input type="suffix" id="suffix" name="suffix" class="form-input-suffix" title="Suffix" placeholder="Suffix" />
                </form>
            </div><!-- .form-wrapper -->
        `;

        container.appendChild(div);
    }
}
customElements.define('member-editor', MemberEditor);