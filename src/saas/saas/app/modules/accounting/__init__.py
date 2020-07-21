import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service

def includeme(config):
    log.info('including: saas.app.modules.accounting')

    config.include('saas.app.modules.accounting.stores')
    config.include('saas.app.modules.accounting.api')

    services = get_service(None)

    modules = services['modules']
    modules['accounting'] = {
        'navigators': [
            {
                'id': 'accounting',
                'title': 'Accounting',
                'help': 'Accounting',
                'icon': '<span class="material-icons">account_balance</span>',
                'template': 'saas.app.modules.accounting:templates/module.html'
            }
        ],
        'views': [],
        'css': [],
        'js': [
            {
                'type': 'module',
                'script': '/static/js/modules/accounting/actions.js',
                'async': True
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/accounting/account-tree/account-tree.js',
                'async': True
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/accounting/account-editor/account-editor.js',
                'async': True
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/accounting/accounting-journal/accounting-journal.js',
                'async': True
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/accounting/accounting-journals/accounting-journals.js',
                'async': True
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/accounting/account-selector/account-selector.js',
                'async': True
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/accounting/account-selector/account-selector-view.js',
                'async': True
            }
        ]
    }