'use strict';

class ClientList extends HTMLElement {

    constructor() {
        self = super();

        const container = document.createElement('div');
        container.classList.add('client-list');

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(container);

        fetch("/api/admin/clients/all", {
            method: 'POST',
            credentials: 'same-origin'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            });
    }
}

customElements.define('client-list', ClientList);
export { ClientList };