import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service


def includeme(config):
    log.info('including: saas.app.modules.purchasing')

    config.include('saas.app.modules.purchasing.stores')
    config.include('saas.app.modules.purchasing.api')

    services = get_service(None)
    modules = services['modules']
    modules['purchasing'] = {
        'navigators': [
            {
                'id': 'Purchasing',
                'title': 'Purchasing',
                'help': 'Manage Purchasing',
                'icon': '<span class="material-icons">view_quilt</span>',
                'template': 'saas.app.modules.purchasing:templates/module.html'
            }
        ],
        'views': [],
        'css': [],
        'js': [
            {
                'type': 'module',
                'script': '/static/js/modules/purchasing/actions.js'
            },
            {
                'type': 'module',
                'script': 'static/custom-elements/purchasing/purchase-order/purchase-order.js'
            },
            {
                'type': 'module',
                'script': 'static/custom-elements/purchasing/purchase-orders/purchase-orders.js'
            },
            {
                'type': 'module',
                'script': 'static/custom-elements/purchasing/purchase-order-selector/purchase-order-selector.js'
            },
            {
                'type': 'module',
                'script': 'static/custom-elements/purchasing/purchase-order-selector/purchase-order-selector-view.js'
            },
            {
                'type': 'module',
                'script': 'static/custom-elements/purchasing/vendor-explorer/vendor-explorer.js'
            },
            {
                'type': 'module',
                'script': 'static/custom-elements/purchasing/vendor-editor/vendor-editor.js'
            },
            {
                'type': 'module',
                'script': 'static/custom-elements/purchasing/vendor-selector/vendor-selector.js'
            },
            {
                'type': 'module',
                'script': 'static/custom-elements/purchasing/vendor-selector/vendor-selector-view.js'
            }
        ]
    }
