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
                    <div class="form-group">
                        <label for="make">Make</label>
                        <input type="text" placeholder="Make" id="make" name="make" class="form-input-text form-make" />
                    </div><!-- .form-group -->
                    <div class="form-group">
                        <label for="brand">Brand</label>
                        <input type="text" placeholder="Brand" id="brand" name="brand" class="form-input-text form-brand" />
                    </div><!-- .form-group -->
                    <div class="form-group">
                        <label for="model">Model</label>
                        <input type="text" placeholder="Model" id="model" name="model" class="form-input-text form-model" />
                    </div><!-- .form-group -->
                    <div class="form-group">
                        <label for="version">Version</label>
                        <input type="text" placeholder="Version" id="version" name="version" class="form-input-text form-version" />
                    </div><!-- .form-group -->
                    <div class="form-group">
                        <label for="sku">SKU</label>
                        <input type="text" placeholder="SKU" id="sku" name="sku" class="form-input-text form-sku" />
                    </div><!-- .form-group -->
                    <div class="form-group">
                        <label for="upc">UPC</label>
                        <input type="text" placeholder="UPC" id="upc" name="upc" class="form-input-text form-upc" />
                    </div><!-- .form-group -->
                </fieldset>
                <fieldset>
                    <legend>Packing Details</legend>
                    <div class="form-group">
                        <label for="length">Length</label>
                        <input type="number" placeholder="Length" id="length" name="length" class="form-input-number form-length" min="0" />
                    </div><!-- .form-group -->
                    <div class="form-group">
                        <label for="width">Width</label>
                        <input type="number" placeholder="Width" id="width" name="width" class="form-input-number form-width" min="0" />
                    </div><!-- .form-group -->
                    <div class="form-group">
                        <label for="height">Height</label>
                        <input type="number" placeholder="Height" id="height" name="height" class="form-input-number form-height" min="0" />
                    </div><!-- .form-group -->
                    <div class="form-group">
                        <label for="weight">Weight</label>
                        <input type="number" placeholder="Weight" id="weight" name="weight" class="form-input-number form-weight" min="0" />
                    </div><!-- .form-group -->
                </fieldset>
                <fieldset>
                    <legend>States</legend>
                    <div class="form-group">
                        <label for="perishable">Perishable</label>
                        <input type="checkbox" placeholder="Perishable" id="perishable" name="perishable" class="form-input-check form-perishable" />
                    </div><!-- .form-group -->
                    <div class="form-group">
                    <div class="form-group">
                        <label for="hazardous">Hazardous</label>
                        <input type="checkbox" placeholder="Hazardous" id="hazardous" name="hazardous" class="form-input-check form-hazardous" />
                    </div><!-- .form-group -->
                    <div class="form-group">
                </fieldset>
                <button type="button" id="btnSave" class="btn btn-save btn-default">Save</button>
                <button type="button" id="btnCancel" class="btn btn-cancel">Cancel</button>
            </form>
        `;

        container.appendChild(div);

        const save = div.querySelector('button#btnSave');
        save.addEventListener('click', function(e) {
            const form = div.querySelector('form.form-item');
            const name = form.querySelector('input#name');
            const desc = form.querySelector('input#description');
            const make = form.querySelector('input#make');
            const brand = form.querySelector('input#brand');
            const model = form.querySelector('input#model');
            const version = form.querySelector('input#version');
            const sku = form.querySelector('input#sku');
            const upc = form.querySelector('input#upc');

            const length = form.querySelector('input#length');
            const width = form.querySelector('input#width');
            const height = form.querySelector('input#height');
            const weight = form.querySelector('input#weight');

            const perishable = form.querySelector('input#perishable');
            const hazardous = form.querySelector('input#hazardous');

            self.dispatchEvent(new CustomEvent('onsaveitem', {
                bubbles: true,
                cancelable: true,
                detail: {
                    name: name.value,
                    description: desc.value,
                    make: make.value,
                    brand: brand.value,
                    model: model.value,
                    version: version.value,
                    sku: sku.value,
                    upc: upc.value,
                    length: length.value,
                    width: width.value,
                    height: height.value,
                    weight: weight.value,
                    perishable: perishable.value,
                    hazardous: hazardous.value
                }
            }));
        });
    }
}
customElements.define('item-editor', ItemEditor);
export { ItemEditor };