'use strict';
import { Util } from '/static/js/util.js';
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

                    <fieldset id="tasks-wrapper">
                        <legend>Tasks</legend>
                        <ul id="tasks">
                        </ul>
                        <a title="Add Task" id="link-add-task" class="link-add-task" href="#">&plus;</a>
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
            console.log('btn-save');
        });

        const btnnoteadd = shadow.getElementById('btn-note-add');
        btnnoteadd.addEventListener('click', function(e) {
            console.log('btn-note-add');
        });

        shadow.getElementById('link-add-task').addEventListener('click', function(e) {
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
        });
    }
}
customElements.define('project-editor', ProjectEditor);