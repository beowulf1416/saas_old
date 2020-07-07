import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service


def includeme(config):
    log.info('including: saas.app.modules.inventory')    

    config.include('saas.app.modules.inventory.stores')
    config.include('saas.app.modules.inventory.views')
    config.include('saas.app.modules.inventory.views.api')

    config.include('saas.app.modules.inventory.views.transactions')

    services = get_service(None)
    modules = services['modules']
    modules['inventory'] = {
        'navigators': [
            {
                'id': 'inventory',
                'title': 'Inventory',
                'help': 'Manage Inventory',
                'icon': '<span class="material-icons">view_quilt</span>',
                'template': 'saas.app.modules.inventory:templates/module.html'
            }
        ],
        'views': [
            {
                'id': 'inv-item-selector',
                'title': 'Item Selector',
                'help': 'Inventory Item Selector',
                'icon': '<span class="material-icons">view_quilt</span>',
                'template': 'saas.app.modules.inventory:templates/item-selector.html'
            }
        ],
        'css': [],
        'js': [
            {
                'type': 'module',
                'script': '/static/js/modules/inventory/actions.js'
            },
            {
                'type': 'module',
                'script': '/static/js/modules/inventory/inventory.js'
            },
            {
                'type': 'module',
                'script': '/static/custom.elements/inventory/items.explorer/items.explorer.js'
            },
            {
                'type': 'module',
                'script': '/static/custom.elements/inventory/item.selector/item.selector.js' 
            },
            {
                'type': 'module',
                'script': '/static/custom.elements/inventory/item.selector/item-selector-view.js' 
            },
            {
                'type': 'module',
                'script': '/static/custom.elements/inventory/item.editor/item.editor.js'
            },
            {
                'type': 'module',
                'script': '/static/custom.elements/inventory/warehouse.editor/warehouse.editor.js'
            },
            {
                'type': 'module',
                'script': '/static/custom.elements/inventory/warehouse.explorer/warehouse.explorer.js'
            },
            {
                'type': 'module',
                'script': 'static/custom.elements/inventory/warehouse.selector/warehouse.selector.js'
            },
            {
                'type': 'module',
                'script': 'static/custom.elements/inventory/warehouse.selector/warehouse.selector.view.js'
            },
            {
                'type': 'module',
                'script': 'static/custom.elements/inventory/receiving-dashboard/receiving-dashboard.js'
            },
            {
                'type': 'module',
                'script': 'static/custom.elements/inventory/receiving-editor/receiving-editor.js'
            },
            {
                'external': 'true',
                'script': 'https://unpkg.com/rxjs/bundles/rxjs.umd.min.js'
            }
        ]
    }