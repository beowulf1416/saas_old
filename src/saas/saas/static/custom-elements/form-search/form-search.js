'use strict';
class FormSearch extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/form-search/form-search.css');

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
        const title = this.hasAttribute('title') ? this.getAttribute('title') : 'Filter';
        const placeholder = this.hasAttribute('placeholder') ? this.getAttribute('placeholder') : 'Filter';

        const div = document.createElement('div');
        div.innerHTML = `
            <div class="form-wrapper">
                <form id="form-filter" role="search">
                    <label for="filter">Find</label>
                    <input type="search" id="filter" name="filter" class="form-input-filter" title="${title}" placeholder="${placeholder}" />
                    <button type="button" id="btn-filter" title="Filter">
                        <span class="material-icons">search</span>
                    </button>
                </form>
            </div><!-- .form-wrapper -->
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const search = function(filter) {
            self.dispatchEvent(new CustomEvent('search', {
                bubbles: true,
                cancelable: true,
                detail: {
                    filter: filter
                }
            }));
        };

        const input_filter = shadow.getElementById('filter');
        input_filter.addEventListener('keydown', function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();

                search(input_filter.value);
            }
        });

        const btnfilter = shadow.getElementById('btn-filter');
        btnfilter.addEventListener('click', function() {
            search(input_filter.value);
        });
    }
}
customElements.define('form-search', FormSearch);