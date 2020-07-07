'use strict';
const { fromEvent, from, of } = rxjs;
const {
    debounceTime,
    filter,
    distinctUntilChanged,
    map,
    switchMap,
    tap
} = rxjs.operators;
import { Tags } from '/static/js/modules/crm/tags.js';
class TagEditor extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom.elements/crm/tag-editor/tag-editor.css');

        const style_default = document.createElement("link");
        style_default.setAttribute('rel', 'stylesheet');
        style_default.setAttribute('href', '/static/css/default.css');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this._init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(style_default);
        shadow.appendChild(div);

        this._attachEventHandler = this._attachEventHandler.bind(this);

        this._attachEventHandler();
    }

    _init(container) {
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <ul class="tag-list">
            </ul>
            <a id="tag-add" class="tag tag-add" href="#" title="Add Tag">&plus;</a>
            <input type="text" id="tag-text" name="tagtext" title="Tag Text" placeholder="Tag" />
            <datalist id="tags-suggested">
            </datalist>
        `;

        container.appendChild(div);
    }

    _attachEventHandler() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client_id');

        const tagadd = shadow.getElementById('tag-add');
        const tagtext = shadow.getElementById('tag-text');
        fromEvent(tagtext, 'keyup')
            .pipe(
                debounceTime(250),
                map(e => tagtext.value),
                filter(query => query.length > 3),
                distinctUntilChanged(),
                switchMap(query => from(Tags.filter(client_id, query))),
                tap(r => {
                    console.log(r);
                })
            )
            .subscribe();

        // const tagtext = shadow.getElementById('tagtext');
        // tagtext.addEventListener('keyup', function(e) {

        // });
    }
}
customElements.define('tag-editor', TagEditor);