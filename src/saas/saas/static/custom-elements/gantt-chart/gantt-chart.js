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
        this._draw_chart = this._draw_chart.bind(this);
        this.setProject = this.setProject.bind(this);

        this._attachEventHandlers();
    }

    static get observedAttributes() {
        return [
            'min',
            'max'
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case 'min': {
                break;
            }
            case 'max': {
                break;
            }
            default: {
                break;
            }
        }
        this._draw_chart();
    }

    _init(container) {
        this._periods = [];
        this._tasks = [];

        const div = document.createElement('div');
        div.classList.add('chart-wrapper');
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
            this._draw_chart();
        }
    }

    setProject(project = {}) {
        const self = this;
        const shadow = this.shadowRoot;
        
        self._project = project;
        self._draw_chart();
    }

    _draw_chart() {
        const self = this;
        const shadow = this.shadowRoot;

        const project = self._project ? self._project : { tasks: [] };
        const parent = this.parentElement;

        const width = parent.clientWidth - 200;
        const height = parent.clientHeight;
        const row_height = 16;

        const margin = {
            top: 20,
            right: 0,
            bottom: 20,
            left: 20
        };

        const xmin = project.tasks.length > 0 ? d3.min(project.tasks, t => t.start) : moment().subtract(12, 'hours').toDate();
        const xmax = project.tasks.length > 0 ? d3.max(project.tasks, t => t.end) : moment().add(24, 'hours').toDate();

        const x = d3.scaleTime()
            .domain([xmin.getTime(), xmax.getTime()])
            .rangeRound([0, width])
            .nice();

        const y = d3.scaleBand()
            .domain([0, project.tasks.length]);

        const svg = d3.select(shadow)
            .select('#chart')
            .attr('viewBox', [ 0, 0, width, height]);

        // x-axis
        if (svg.select('g.x-axis').empty()) {
            svg.append('g')
                .attr('class', 'x-axis')
                .attr('fill', 'red')
                .attr('transform', `translate(0, 0)`)
                .call(d3.axisBottom(x).ticks());
        } else {
            svg.select('g.x-axis')
                .call(d3.axisBottom(x).ticks());
        }

        // tasks
        if (svg.select('g.tasks').empty()) {
            svg.append('g')
                // .attr('fill', 'red')
                .attr('transform', `translate(0, ${margin.top})`)
                .attr('class', 'tasks');
        } else {
            svg.select('g.tasks')
                .selectAll('rect')
                .data(project.tasks)
                .join(
                    enter => enter.append('g'),
                    update => update,
                    exit => exit.remove()
                )
                    .class('task')
                    .append('rect')
                        .attr('class', 'task-bar')
                        .attr('x', d => x(d.start))
                        .attr('y', (d, i) => (row_height * (i + 1))- 2)
                        .attr('width', d => x(d.end))
                        .attr('height', row_height - 4)
                        .attr('fill', d => d.color )
                        .on('click', function(e) {
                            self.dispatchEvent(new CustomEvent('taskclick', {
                                bubbles: true,
                                cancelable: true,
                                detail: {
                                    task: e
                                }
                            }));
                        });
        }
    }
}
customElements.define('gantt-chart', GanttChart);