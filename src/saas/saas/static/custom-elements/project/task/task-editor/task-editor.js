'use strict'
class TaskEditor extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/project/task/task-editor/task-editor.css');

        const style_default = document.createElement("link");
        style_default.setAttribute('rel', 'stylesheet');
        style_default.setAttribute('href', '/static/css/default.css');

        const div = document.createElement('div');
        div.classList.add('component-wrapper');

        this._init(div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(style_default);
        shadow.appendChild(div);

        this._attachEventHandlers = this._attachEventHandlers.bind(this);

        this._attachEventHandlers();
    }

    // connectedCallback() {
    //     if (this.isConnected) {
    //     }
    // }

    get value() {
        const shadow = this.shadowRoot;

        const task_id = this.hasAttribute('task-id') ? this.getAttribute('task-id') : uuidv4();

        const input_name = shadow.getElementById('name');
        const input_desc = shadow.getElementById('description');
        const input_start_date = shadow.getElementById('start-date');
        const input_start_time = shadow.getElementById('start-time');
        const input_end_date = shadow.getElementById('end-date');
        const input_end_time = shadow.getElementById('end-time');
        const input_color = shadow.getElementById('color');

        return {
            taskId: task_id,
            name: input_name.value,
            description: input_desc.value,
            start: moment(`${input_start_date.value} ${input_start_time.value}`).toDate(),
            end: moment(`${input_end_date.value} ${input_end_time.value}`).toDate(),
            color: input_color.value
        };
    }

    _init(container) {
        const current_date = moment().startOf('day');
        const tomorrow_date = moment().add(1, 'days').startOf('day');

        const div = document.createElement('div');
        div.innerHTML = `
            <div class="form-wrapper">
                <form id="task">
                    <!-- name -->
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" class="form-input-name" title="Task Name" placeholder="Task" required />

                    <!-- description -->
                    <label for="description">Description</label>
                    <textarea id="description" name="description" class="form-input-description" title="Task Description"></textarea>

                    <fieldset id="dates">
                        <legend>Dates</legend>

                        <!-- start -->
                        <label for="start">Start</label>
                        <div id="start" class="form-group">
                            <input type="date" id="start-date" name="start_date" class="form-date-start" title="Start Date" value="${current_date.format('YYYY-MM-DD')}"/>
                            <input type="time" id="start-time" name="start_time" class="form-time-start" title="Start Time" value="${current_date.format('HH:mm')}"/>
                        </div><!-- .form-group -->

                        <!-- end -->
                        <label for="end">End</label>
                        <div id="start" class="form-group">
                            <input type="date" id="end-date" name="end_date" class="form-date-end" title="End Date" value="${tomorrow_date.format('YYYY-MM-DD')}" />
                            <input type="time" id="end-time" name="end_time" class="form-time-end" title="End Time" value="${tomorrow_date.format('HH:mm')}" />
                        </div><!-- .form-group -->
                    </fieldset>

                    <fieldset id="extra">
                        <!-- color -->
                        <label for="color">Color</label>
                        <input type="color" id="color" name="color" title="Task Color" />
                    </fieldset>

                    <button type="button" id="btn-save" class="btn btn-save" title="Save Task">
                        <span class="material-icons">save</span>
                    </button>
                </form>
            </div><!-- .form-wrapper -->
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        const input_name = shadow.getElementById('name');
        input_name.addEventListener('blur', function() {
            self.dispatchEvent(new CustomEvent('change', {
                bubbles: true,
                cancelable: true,
                detail: {
                    task: {
                        name: input_name.value
                    }
                }
            }));
        });

        shadow.getElementById('btn-save').addEventListener('click', function() {
            self.dispatchEvent(new CustomEvent('save', {
                bubbles: true,
                cancelable: true,
                detail: {
                    task: self.value
                }
            }));
        });
    }
}
customElements.define('task-editor', TaskEditor);