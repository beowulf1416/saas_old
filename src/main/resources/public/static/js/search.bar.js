'use strict';

class SearchBar extends HTMLElement {

    constructor() {
        self = super();

        const div = document.createElement('div');
        div.classList.add('container');

        this.initForm(self, div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(div);
    }

    initForm(component, container) {
        const form = document.createElement('form');
        form.classList.add('form-search');
        form.innerHTML = `
            <input type="search" id="search" class="form-input form-search" ttile="Search" />
            <button type="submit" id="btnSearch">Search</button>
        `;

        container.appendChild(form);
    }

    connectedCallback() {
        if (this.isConnected) {
            const shadow = this.shadowRoot;
            const btn = shadow.querySelector('#btnSearch');
            btn.addEventListener('click', function(e) {
                console.log('search');
            });
        }
    }
}

customElements.define('search-bar', SearchBar);
export { SearchBar };