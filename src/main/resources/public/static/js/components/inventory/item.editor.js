'use strict';

class ItemEditor extends HTMLElement {

    constructor() {
        self = super();

        const div = document.createElement('div');
        div.classList.add('wrapper');

        this.initForm(self, div);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(div);
    }

    initForm(component, container) {
        const div = document.createElement('div');
        div.classList.add('form-wrapper', 'form-item-wrapper');
        div.innerHTML = `
            <form class="form-item">
                <fieldset>
                    <legend>General</legend>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" placeholder="Name" id="name" name="name" class="form-input-text form-name" />
                    </div><!-- .form-group -->
                    <div class="form-group">
                        <label for="description">Description</label>
                        <input type="text" placeholder="Description" id="description" name="description" class="form-input-text form-desc" />
                    </div><!-- .form-group -->
                </fieldset>
                <button type="button" id="btnSave" class="btn btn-save btn-default">Save</button>
                <button type="button" id="btnCancel" class="btn btn-cancel">Cancel</button>
            </form>
        `;

        container.appendChild(div);

        const save = div.querySelector('button#btnSave');
        save.addEventListener('click', function(e) {
            const form = div.querySelector('form.form-item');
            const data = new FormData(form);

            self.dispatchEvent(new CustomEvent('onsaveitem', {
                bubbles: true,
                cancelable: true,
                detail: data
            }));
        });
    }
}
customElements.define('item-editor', ItemEditor);
export { ItemEditor };