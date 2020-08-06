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

        this.setProject = this.setProject.bind(this);
        this._attachEventHandlers = this._attachEventHandlers.bind(this);
        this.render = this.render.bind(this);

        this._attachEventHandlers();

        // this._test = this._test.bind(this);
        // this._test();
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
        chart.setAttribute('viewBox', `0 0 ${width - 2} ${height}`);
        // chart.setAttribute('width', width - 2);
        // chart.setAttribute('height', height);

        const task_section_width = 200;

        const line_height = parseInt(window.getComputedStyle(document.body, null)['font-size'].replace('px', ''));
        const row_height =  line_height + 4;
        console.log(row_height);
        const rows = height / row_height;
        for( let i = 0; i < rows; i++) {
            const row_task_section = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            row_task_section.setAttribute('id', 'bg');
            row_task_section.setAttribute('x', 0);
            row_task_section.setAttribute('y', i * row_height);
            row_task_section.setAttribute('width', task_section_width);
            row_task_section.setAttribute('height', row_height);
            row_task_section.setAttribute('style', i % 2 ? 'fill:#ffffff;' : 'fill:#eeeeee;');
            chart.appendChild(row_task_section);

            const row = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            row.setAttribute('id', 'bg');
            row.setAttribute('x', task_section_width);
            row.setAttribute('y', i * row_height);
            row.setAttribute('width', width);
            row.setAttribute('height', row_height);
            row.setAttribute('style', i % 2 ? 'fill:#ffffff;' : 'fill:#f2f3f4;');
            chart.appendChild(row);

            // event handers
            row_task_section.addEventListener('click', function(e) {
                console.log(e);
            });
        }

        const header = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        header.setAttribute('id', 'bg');
        header.setAttribute('x', 0);
        header.setAttribute('y', 0);
        header.setAttribute('width', width);
        header.setAttribute('height', row_height);
        header.setAttribute('style', 'fill:#bebebe;');
        chart.appendChild(header);

        const task_section_separator = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        task_section_separator.setAttribute('x1', task_section_width);
        task_section_separator.setAttribute('y1', 0);
        task_section_separator.setAttribute('x2', task_section_width);
        task_section_separator.setAttribute('y2', height);
        task_section_separator.setAttribute('style', 'stroke:rgb(0,0,0);stroke-width:1;');
        chart.appendChild(task_section_separator);

        const header_text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        header_text.setAttribute('x', 2);
        header_text.setAttribute('y', line_height);
        header_text.setAttribute('style', 'fill:black;');
        header_text.textContent = 'Tasks';
        chart.appendChild(header_text);
    }

    setProject(project = {}) {
        const self = this;
        const shadow = this.shadowRoot;

        let count_periods = 0;

        if (project.unit && typeof project.unit == 'string') {
            switch(project.unit) {
                case 'minutes': {
                    const hperiods = shadow.querySelector('.chart-periods');
                    const markers = shadow.querySelector('.period-markers');
                    for(let i = 0; i<60; i = i+10) {
                        const div = document.createElement('div');
                        div.innerHTML = `<span>${i}</span>`;
                        hperiods.appendChild(div);

                        const span = document.createElement('span');
                        markers.appendChild(span);
                    }
                    count_periods = hperiods.childNodes.length;
                    hperiods.style.gridTemplateColumns = `50px repeat(${count_periods}, 1fr)`;
                    markers.style.gridTemplateColumns = `50px repeat(${count_periods}, 1fr)`;
                    break;
                }
                default: {
                    // minutes
                    break;
                }
            }
        }

        if (project.tasks && Array.isArray(project.tasks)) {
            const elem_main = shadow.querySelector('main');
            project.tasks.forEach((task) => {
                const div = document.createElement('div');
                div.classList.add('task');
                div.innerHTML = `
                    <div class="name">
                        ${task.name}
                    </div><!-- .name -->
                    <ul class="bar">
                        <li>${task.name}</li>
                    </ul>
                `;

                const ul = div.querySelector('ul');
                ul.style.gridTemplateColumns = `repeat(${count_periods}, 1fr)`;

                elem_main.appendChild(div);
            });
        }
    }

    _addTasks(task = {}, periods = 0, container = {}) {
        const ul = document.createElement('ul');
        tasks.forEach((task) => {
            const li = document.createElement('li');
            li.innerHTML = `${task.name}`;

            ul.appendChild(li);
        });
        const div = document.createElement('div');
        div.innerHTML = `${ul}`;
        container.appendChild(div);
    }

    _test() {
        const self = this;
        const shadow = this;

        self.setProject({
            name: 'project',
            unit: 'minutes',
            tasks: [
                {
                    id: 1,
                    name: 'task 1',
                    tasks: [
                        {
                            id: 4,
                            name: 'task 4',
                            duration: 10
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'task 2'
                },
                {
                    id: 3,
                    name: 'task 3'
                }
            ]
        });
    }
}
customElements.define('gantt-chart', GanttChart);