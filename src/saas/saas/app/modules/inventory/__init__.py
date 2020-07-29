import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service


def includeme(config):
    log.info('including: saas.app.modules.inventory')    

    config.include('saas.app.modules.inventory.stores')
    config.include('saas.app.modules.inventory.api')

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
                'script': '/static/js/modules/inventory/inventory.js',
                'async': True,
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/inventory/items-explorer/items-explorer.js',
                'async': True,
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/inventory/item-selector/item-selector.js',
                'async': True,
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/inventory/item-selector/item-selector-view.js',
                'async': True,
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/inventory/item-editor/item-editor.js',
                'async': True,
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/inventory/warehouse-editor/warehouse-editor.js',
                'async': True,
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/inventory/warehouse-explorer/warehouse-explorer.js',
                'async': True,
            },
            {
                'type': 'module',
                'script': 'static/custom-elements/inventory/warehouse-selector/warehouse-selector.js',
                'async': True,
            },
            {
                'type': 'module',
                'script': 'static/custom-elements/inventory/warehouse-selector/warehouse-selector-view.js',
                'async': True,
            },
            {
                'type': 'module',
                'script': 'static/custom-elements/inventory/receiving-dashboard/receiving-dashboard.js',
                'async': True,
            },
            {
                'type': 'module',
                'script': 'static/custom-elements/inventory/receiving-editor/receiving-editor.js',
                'async': True,
            },
            {
                'type': 'module',
                'script': 'static/custom-elements/inventory/location-explorer/location-explorer.js',
                'async': True,
            },
            {
                'type': 'module',
                'script': 'static/custom-elements/inventory/location-editor/location-editor.js',
                'async': True,
            },
            {
                'external': 'true',
                'script': 'https://unpkg.com/rxjs/bundles/rxjs.umd.min.js'
            }
        ]
    }