'use strict';

// ref: https://www.w3.org/TR/wai-aria-practices/examples/treegrid/treegrid-1.html

class OrganizationTree extends HTMLElement {
    
    constructor() {
        const self = super();

        const style = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/css/clients/organization.tree.css');

        const styleTree = document.createElement("link");
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/static/css/treegrid.css');

        const container = document.createElement('div');
        container.classList.add('component-wrapper');

        this.init(self, container);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(styleTree);
        shadow.appendChild(container);

        this.setOrganizations = this.setOrganizations.bind(this);
    }

    init(component, container) {
        const ths = [];
        ths.push(`<th class="col-name">Name</th>`);
        ths.push(`<th class="col-description">Description</th>`);
        const thall = ths.join('');

        const div = document.createElement('div');
        div.classList.add('wrapper-tree');
        div.innerHTML = `
            <table class="treegrid tbl-organizations" role="treegrid" aria-label="Organizational Chart">
                <caption>Organizational Chart</caption>
                <colgroup>
                    <col class="col-name">
                    <col class="col-description">
                </colgroup>
                <thead>
                    <tr>
                        ${thall}
                    </tr>
                </thead>
                <tbody>
                </tbody>
                <tfoot>
                </tfoot>
            </table>
        `

        container.appendChild(div);
    }

    setOrganizations(organizations = []) {
        const self = this;
        const shadow = this.shadowRoot;
        const tbody = shadow.querySelector('table.tbl-organizations tbody');
        while(tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
        }
        organizations.forEach(o => {
            const tds = [];
            tds.push(`<td class="col-name" role="gridcell" data-level="${o.level}"><span>${o.name}</span></td>`);
            tds.push(`<td class="col-description" role="gridcell"><span>${o.description}</span></td>`);
            const tdall = tds.join('');

            const tr = document.createElement('tr');
            tr.classList.add('row-org');
            tr.setAttribute('role', 'row');
            tr.setAttribute('aria-level', o.level);
            tr.setAttribute('aria-posinset', 1);
            tr.setAttribute('aria-setsize', 1);
            tr.setAttribute('aria-expanded', true);
            tr.setAttribute('draggable', true);
            tr.dataset.orgid = o.id;
            tr.innerHTML = `
                ${tdall}
            `;

            tbody.appendChild(tr);

            tr.addEventListener('dragstart', function(e) {
                tr.classList.add('drag-start');
            });

            tr.addEventListener('dragenter', function(e) {
                e.preventDefault();
                tr.classList.add('drag-over');
            });

            tr.addEventListener('dragexit', function(e) {
                e.preventDefault();
                tr.className.add('drag-over');
            });

            tr.addEventListener('dragover', function(e) {
                e.preventDefault();
            });

            tr.addEventListener('drop', function(e) {
                e.preventDefault();
                const trstart = shadow.querySelector('tr.drag-start');
                trstart.classList.remove('drag-start');
            });
        });
    }
}
customElements.define('organization-tree', OrganizationTree);
export { OrganizationTree };