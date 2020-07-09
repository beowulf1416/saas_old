'use strict';
// https://developer.mozilla.org/en-US/docs/Games/Anatomy

class GISEditor extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/gis/gis-editor/gis-editor.css');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this._init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(div);

        this._attachEventHandlers = this._attachEventHandlers.bind(this);
        this._startRenderLoop = this._startRenderLoop.bind(this);
        this._resize = this._resize.bind(this);
        this._redraw = this._redraw.bind(this);


        this._attachEventHandlers();
        this._resize();

        setTimeout(() => {
            this._startRenderLoop(performance.now());
        }, 5000);
    }

    connectedCallback() {
        if (this.isConnected) {
            this._continue = true;
        }
    }

    disconnectedCallback() {
        this._continue = false;
    }

    _init(container) {
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <canvas id="gis-canvas"></canvas>
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        // const resizeObserver = new ResizeObserver((entries) => {
        //     for (const entry of entries) {
        //         console.log(entry);
        //     }
        // });
        // resizeObserver.observe(this);

        const wrapper = shadow.querySelector('.component-wrapper > .wrapper');
        console.log(wrapper.offsetheight);

        const canvas = shadow.getElementById('gis-canvas');
        canvas.addEventListener('resize', function(e) {
            console.log('resize');
        });
        // canvas.style.height = '100%';
        // console.log(canvas.offsetHeight);
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;

        window.addEventListener('resize', function(e) {
            console.log('resize');
        });
    }

    _startRenderLoop(tframe) {
        const self = this;
        const shadow = this.shadowRoot;

        const canvas = shadow.getElementById('gis-canvas');
        console.log(canvas.parentElement.clientHeight);

        const height = canvas.height;
        const width = canvas.width;
        console.log(height);
        console.log(width);

        if (this._continue) {
            this._redraw();
        }
        console.log('render');

        // this._request_id = window.requestAnimationFrame(this._startRenderLoop);
    }

    _resize() {
        const self = this;
        const shadow = this.shadowRoot;

        console.log(window);

        const canvas = shadow.getElementById('gis-canvas');
        console.log(canvas.parentElement.parentElement.clientWidth);
    }

    _redraw() {

    }
}
customElements.define('gis-editor', GISEditor);