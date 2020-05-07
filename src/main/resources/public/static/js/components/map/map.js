"use strict";

class MapElement extends HTMLElement {

    constructor() {
        self = super();

        const div = document.createElement('div');
        div.classList.add('wrapper');

        this.initMap(self, div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(div);
    }

    initMap(component, container) {
        const div = document.createElement('div');
        div.classList.add('canvas-wrapper');
        div.innerHTML = `
            <canvas class="map-canvas"></canvas>
        `;

        container.appendChild(div);
    }
}

customElements.define('map-element', MapElement);
export { MapElement };