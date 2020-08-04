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

    get value() {
        const shadow = this.shadowRoot;

        const tasks = [];
        shadow.querySelectorAll('task-editor').forEach((editor) => {
            const value = editor.value;

            tasks.push(value);
        });

        const input_name = shadow.getElementById('name');
        const input_desc = shadow.getElementById('description');
        const task_id = this.hasAttribute('task-id') ? this.getAttribute('task-id') : uuidv4();

        return {
            taskId: task_id,
            name: input_name.value,
            description: input_desc.value,
            tasks: tasks
        };
    }

    _init(container) {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="form-wrapper">
                <!-- name -->
                <label for="name">Name</label>
                <input type="text" id="name" name="name" class="form-input-name" title="Task Name" placeholder="Task" />

                <!-- description -->
                <label for="description">Description</label>
                <textarea id="description" name="description" class="form-input-description" title="Task Description"></textarea>
            </div><!-- .form-wrapper -->
            <div id="tasks-wrapper">
                <header>Tasks</header>
                <main>
                    <div class="toolbar" role="toolbar">
                        <button type="button" id="btn-add-task" class="btn btn-add-task" title="Add Task">
                            <span class="material-icons">add_task</span>
                        </button>
                    </div><!-- .toolbar -->
                    <ul id="tasks">
                    </ul><!-- #tasks -->
                    <a title="Add Task" id="link-add-task" class="link-add-task" href="#">&plus;</a>
                </main>
            </div><!-- #tasks-wrapper -->
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

        shadow.getElementById('btn-add-task').addEventListener('click', function(e) {
            e.preventDefault();

            const li = document.createElement('li');
            li.classList.add('task', 'collapsable');
            li.innerHTML = `
                <section class="task">
                    <header>
                        <a class="link-task link-collapse" title="Task" href="#">Task</a>
                    </header>
                    <main>
                        <task-editor client-id="${client_id}"></task-editor>
                    </main>
                </section>
            `;

            const ul = shadow.getElementById('tasks');
            ul.appendChild(li);

            // event handler
            li.querySelector('.link-task').addEventListener('click', function(e) {
                e.preventDefault();

                li.classList.toggle('collapsed');
            });

            li.querySelector('task-editor').addEventListener('change', function(e) {
                const task = e.detail.task;

                li.querySelector('.link-task').text = task.name;
            });
        });
    }
}
customElements.define('task-editor', TaskEditor);