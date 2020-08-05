'use strict';
import { Util } from '/static/js/util.js';
import { Project } from '/static/js/modules/project/project.js';
import { notify } from '/static/js/ui/ui.js';
class ProjectEditor extends HTMLElement {

    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/custom-elements/project/project-editor/project-editor.css');

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
        this._buildProject = this._buildProject.bind(this);

        this._attachEventHandlers();
    }

    _init(container) {
        const div = document.createElement('div');
        div.classList.add('wrapper');
        div.innerHTML = `
            <div class="toolbar" role="toolbar">
                <button type="button" id="btn-save" class="btn btn-new" title="Save">
                    <span class="material-icons">save</span>
                </button>
                <div class="button-group">
                    <button type="button" id="btn-note-add" class="btn btn-note-add" title="Add Note">
                        <span class="material-icons">note</span>
                    </button>
                </div><!-- .button-group -->
            </div><!-- .toolbar -->
            <div class="form-wrapper">
                <form id="form-project">
                    <!-- name -->
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" class="form-input-name" title="Name" placeholder="Name" />

                    <!-- description -->
                    <label for="description">Description</label>
                    <textarea id="description" name="description" class="form-input-description" title="Description"></textarea>

                    <!-- active -->
                    <div class="form-group form-group-active">
                        <input type="checkbox" id="active" name="active" class="form-input-active" title="Project Status" />
                        <label for="active">Active</label>
                    </div><!-- .form-group -->

                    <div class="wrapper-dates">
                        <fieldset id="dates-planned">
                            <legend>Planned</legend>

                            <!-- start -->
                            <label for="planned-start-date">Start</label>
                            <input type="date" id="planned-start-date" name="planned_start_date" class="form-input-planned-start-date" title="Planned Start Date" />
                            <input type="time" id="planned-start-time" name="planned_start_name" class="form-input-planned-start-time" title="Planned Start Time" />

                            <!-- end -->
                            <label for="planned-end-date">End</label>
                            <input type="date" id="planned-end-date" name="planned_end_date" class="form-input-planned-end-date" title="Planned End Date" />
                            <input type="time" id="planned-end-time" name="planned_end_time" class="form-input-planned-end-time" title="Planned End Time" />
                        </fieldset>

                        <fieldset id="dates-actual">
                            <legend>Actual</legend>

                            <!-- start -->
                            <label for="actual-start-date">Start</label>
                            <input type="date" id="actual-start-date" name="actual_start_date" class="form-input-actual-start-date" title="Actual Start Date" />
                            <input type="time" id="actual-start-time" name="actual_start_time" class="form-input-actual-start-time" title="Actual Start Time" />

                            <!-- end -->
                            <label for="actual-end-date">End</label>
                            <input type="date" id="actual-end-date" name="actual_end_date" class="form-input-actual-end-date" title="Actual End Date" />
                            <input type="time" id="actual-end-time" name="actual_end_time" class="form-input-actual-end-time" title="Actual End Time" />
                        </fieldset>
                    </div><!-- .wrapper-dates -->
                    
                    <fieldset id="tasks-wrapper">
                        <legend>Tasks</legend>
                        <div class="toolbar" role="toolbar">
                            <button type="button" id="btn-add-task" class="btn btn-add-task" title="Add Task">
                                <span class="material-icons">add_task</span>
                            </button>
                        </div><!-- .toolbar -->
                        <ul id="tasks">
                        </ul>
                    </fieldset>
                </form>
            </div><!-- .form-wrapper -->
        `;

        container.appendChild(div);
    }

    _attachEventHandlers() {
        const self = this;
        const shadow = this.shadowRoot;

        const client_id = this.getAttribute('client-id');

        const btnsave = shadow.getElementById('btn-save');
        btnsave.addEventListener('click', function(e) {
            const project = self._buildProject()
            Project.add(project).then((r) => {
                notify(r.status, r.message, 3000);
            });
        });

        const btnnoteadd = shadow.getElementById('btn-note-add');
        btnnoteadd.addEventListener('click', function(e) {
            console.log('btn-note-add');
        });

        shadow.getElementById('btn-add-task').addEventListener('click', function(e) {
            e.preventDefault();

            const id = 'id' + Util.generateId();

            const li = document.createElement('li');
            li.classList.add('task-items','collapsable');
            li.innerHTML = `
                <section class="task">
                    <header>
                        <a class="link-task link-collapse" id="${id}" title="Task" href="#${id}">Task</a>
                    </header>
                    <main>
                        <task-editor client-id="${client_id}"></task-editor>
                    </main>
                </section>
            `;

            const tasks = shadow.getElementById('tasks');
            tasks.appendChild(li);

            // event handlers
            li.querySelector('.link-collapse').addEventListener('click', function(e) {
                e.preventDefault();
                li.classList.toggle('collapsed');
            });

            li.querySelector('task-editor').addEventListener('change', function(e) {
                const task = e.detail.task;
                li.querySelector('.link-task').text = task.name;
            });
        });
    }

    _buildProject() {
        const self = this;
        const shadow = this.shadowRoot;

        const tasks = [];
        shadow.querySelectorAll('task-editor').forEach((editor) => {
            const value = editor.value;

            tasks.push(value);
        });

        const input_name = shadow.getElementById('name');
        const input_desc = shadow.getElementById('description');
        const project_id = this.hasAttribute('project-id') ? this.getAttribute('project-id') : uuidv4();
        const client_id = this.getAttribute('client-id');

        return {
            clientId: client_id,
            projectId: project_id,
            name: input_name.value,
            description: input_desc.value,
            tasks: tasks
        };
    }
}
customElements.define('project-editor', ProjectEditor);