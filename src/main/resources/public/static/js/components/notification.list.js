'use strict';

class NotificationList extends HTMLElement {

    constructor() {
        self = super();

        const ul = document.createElement('ul');
        ul.classList.add('notification-list');

        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.appendChild(ul);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(div);

        this.add = this.add.bind(this);
    }

    add(status, msg, timeout) {
        const self = this;
        const shadow = this.shadowRoot;
        const ul = shadow.querySelector('ul.notification-list');
        const id = 'msg' + Math.random().toString(16).slice(10);
        const li = document.createElement('li');
        li.id = id;
        li.classList.add('list-item');
        li.classList.add('message');
        li.classList.add('message-' + status);
        li.textContent = msg;
        ul.appendChild(li);
        if (timeout && Number.isInteger(timeout)) {
            setTimeout(() => {
                ul.removeChild(li);
            }, timeout);
        }
    }
}

customElements.define('notification-list', NotificationList);
export { NotificationList };