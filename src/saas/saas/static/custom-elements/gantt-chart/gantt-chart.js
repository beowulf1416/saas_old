'use strict';
class GanttChart extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/gantt-chart/gantt-chart.css');

        const default_style = document.createElement("link");
        default_style.setAttribute('rel', 'stylesheet');
        default_style.setAttribute('href', '/static/css/default.css');

        // const js_d3 = document.createElement('script');
        // js_d3.setAttribute('src', 'https://d3js.org/d3.v5.min.js');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this._init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(default_style);
        shadow.appendChild(div);

        // shadow.appendChild(js_d3);

        this._attachEventHandlers = this._attachEventHandlers.bind(this);
        this._attachEventHandlers();
    }

    _init(container) {
        this._periods = [];
        this._tasks = [];

        const div = document.createElement('div');
        div.innerHTML = `
            <svg id="chart" xmlns="http://www.w3.org/2000/svg">
            </svg>
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;
    }

    connectedCallback() {
        if (this.isConnected) {
            const shadow = this.shadowRoot;
            this.render();
        }
    }

    render() {
        const self = this;
        const shadow = this.shadowRoot;

        const parent = this.parentElement;
        const chart = shadow.getElementById('chart');

        const width = parent.clientWidth;
        const height = parent.clientHeight;
        // chart.setAttribute('viewBox', `0 0 ${width - 2} ${height}`);

        const data = [
            { x: 1, y: 2 },
            { x: 2, y: 4},
            { x: 3, y: 5 }
        ];
        
        const svg = d3.select(shadow)
            .select('#chart')
            .attr('viewBox', [0, 0, width, height]);
        
        svg.append('g')
            .attr('fill', 'steelblue')
            .selectAll('rect')
            .data(data)
            .join('rect')
                .attr('x', d => d.x)
                .attr('y', d => d.y)
                .attr('width', 10)
                .attr('height', 10);
    }
}
customElements.define('gantt-chart', GanttChart);