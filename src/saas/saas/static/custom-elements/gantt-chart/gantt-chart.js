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

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this._init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(default_style);
        shadow.appendChild(div);

        this._attachEventHandlers = this._attachEventHandlers.bind(this);
        this.setProject = this.setProject.bind(this);

        // this._attachEventHandlers();
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
        // const self = this;
        // const shadow = this.shadowRoot;

        console.log('attach');
    }

    connectedCallback() {
        if (this.isConnected) {
            const shadow = this.shadowRoot;
            // this.render();
        }
    }

    // render() {
    //     const self = this;
    //     const shadow = this.shadowRoot;

    //     const parent = this.parentElement;
    //     const chart = shadow.getElementById('chart');

    //     const width = parent.clientWidth;
    //     const height = parent.clientHeight;
    //     // chart.setAttribute('viewBox', `0 0 ${width - 2} ${height}`);

    //     const data = [
    //         { x: 1, y: 2 },
    //         { x: 2, y: 4},
    //         { x: 3, y: 5 }
    //     ];
        
    //     const svg = d3.select(shadow)
    //         .select('#chart')
    //         .attr('viewBox', [0, 0, width, height]);

    //     const start_x = d3.scaleLinear()
    //         .domain([0, d3.max(data, d => d.x )])
    //         .range([0, 10]);

    //     const y = d3.scaleBand()
    //         .domain(d3.range(data.length))
    //         .rangeRound([0, height])
    //         .padding(1);
        
    //     svg.append('g')
    //         .attr('fill', 'steelblue')
    //         .selectAll('rect')
    //         .data(data)
    //         .join('rect')
    //             .attr('x', d=> start_x(d.x))
    //             .attr('y', (d, i) => y(i))
    //             .attr('width', 10)
    //             .attr('height', 10);
    // }

    setProject(project = {}) {
        const self = this;
        const shadow = this.shadowRoot;

        const parent = this.parentElement;
        const chart = shadow.getElementById('chart');

        const width = parent.clientWidth;
        const height = parent.clientHeight;
        const row_height = 16;

        console.log(project);

        const margin = {
            top: 20,
            right: 0,
            bottom: 20,
            left: 20
        };

        const x = d3.scaleTime()
            .domain([Date.now(), Date.now() + 24*60*60*1000])
            .rangeRound([0, width]);

        const y = d3.scaleBand()
            .domain([0, project.tasks.length]);

        const svg = d3.select(shadow)
            .select('#chart')
            .attr('viewBox', [ 0, 0, width, height]);

        // x-axis
        svg.append('g')
            .attr('fill', 'black')
            .attr('transform', `translate(0, 0)`)
            .call(d3.axisBottom(x).ticks());

        svg.append('g')
            .attr('fill', 'red')
            .attr('transform', `translate(0, ${margin.top})`)
            .selectAll('rect')
            .data(project.tasks)
            .join('rect')
                .attr('x', d => x(d.start))
                .attr('y', (d, i) => row_height * i)
                .attr('width', d => x(d.end))
                .attr('height', row_height);
    }
}
customElements.define('gantt-chart', GanttChart);