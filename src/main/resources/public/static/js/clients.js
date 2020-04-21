'use strict';

(function() {
    class ClientSelectorList extends HTMLElement {

        constructor() {
            self = super();

            const ul = document.createElement("ul");
            ul.classList.add("client-list")

            const elemDL = this.for;
            const elem = document.getElementById(elemDL);
            if (elem != null && elem instanceof HTMLDataListElement) {
                console.log(elem.options);
                for(let o of elem.options) {
                    const t = o.getAttribute("label");

                    const a = document.createElement("a");
                    a.classList.add("nav-link");
                    a.classList.add("client-item-link");
                    a.setAttribute("title", t);
                    a.innerText = t;
                    a.setAttribute("href", "#");

                    const li = document.createElement("li");
                    li.classList.add("client-list-item");
                    li.appendChild(a);

                    ul.appendChild(li);
                }
            }

            const container = document.createElement('div');
            container.classList.add('client-selector-list');
            container.appendChild(ul);

            const shadow = this.attachShadow({ mode: 'open' });
            shadow.appendChild(container);

            this.clientSelect = this.clientSelect.bind(this);
        }

        get for() {
            return this.getAttribute('for') || '';
        }

        clientSelect(event, elem) {
            console.log("clientSelect");
            console.log(event);
            console.log(elem);
        }

        connectedCallback() {
            console.log("here");
            const clientLinks = this.shadowRoot.querySelectorAll(".client-item-link");
            for(let l of clientLinks) {
                l.addEventListener("click", (function(f, arg1) { 
                    return function(e) { f(e, arg1) }; 
                })(this.clientSelect, l), false);
            }
        }
    }

    customElements.define('client-selector-list', ClientSelectorList);
})();