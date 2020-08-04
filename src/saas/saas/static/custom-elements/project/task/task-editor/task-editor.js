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
                    <ul id="tasks">
                    </ul><!-- #tasks -->
                    <a title="Add Task" id="link-add-task" class="link-add-task" href="#">&plus;</a>
                </main>
            </div><!-- #tasks-wrapper -->
        `;

        container.appendChild(div);
    }
}
customElements.define('task-editor', TaskEditor);