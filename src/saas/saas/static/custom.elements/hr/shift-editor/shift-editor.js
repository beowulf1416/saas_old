'use strict';
import { notify } from '/static/js/ui/ui.js';
class ShiftEditor extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/hr/shift-editor/shift-editor.css');

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
        this.setShift = this.setShifts.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button type="button" id="save" class="btn btn-save" title="Save">
                    <span class="material-icons">save</span>
                </button>
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form id="form-shift">
                    <!-- name -->
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" class="form-input-name" title="Shift Name" placeholder="Name" />

                    <!-- start -->
                    <label for="start">Start Time</label>
                    <input type="time" id="start" name="start" class="form-input-start" title="Start Time" placeholder="Start" />

                    <!-- end -->
                    <label for="end">End Time</label>
                    <input type="time" id="end" name="end" class="form-input-end" title="End Time" placeholder="End" />
                </form>
            </div><!-- .form-wrapper -->
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const save = shadow.getElementById('save');
        save.addEventListener('click', function(e) {
            console.log('//TODO save');
        });
    }

    setShift(shift = {}) {
        const self = this;
        const shadow = this.shadowRoot;

        
    }
}
customElements.define('shift-editor', ShiftEditor);