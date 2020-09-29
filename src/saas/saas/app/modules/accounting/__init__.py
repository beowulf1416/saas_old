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
                'template': 'saas.app.modules.accounting:templates/navigator.html',
                'permission': 'accounting.dashboard'
            }
        ],
        'js': [
            {
                'type': 'module',
                'script': '/static/js/modules/accounting/actions.js',
                'async': True
            },
            # {
            #     'type': 'module',
            #     'script': '/static/custom-elements/accounting/account-tree/account-tree.js',
            #     'async': True
            # },
            # {
            #     'type': 'module',
            #     'script': '/static/custom-elements/accounting/account-editor/account-editor.js',
            #     'async': True
            # },
            # {
            #     'type': 'module',
            #     'script': '/static/custom-elements/accounting/accounting-journal/accounting-journal.js',
            #     'async': True
            # },
            # {
            #     'type': 'module',
            #     'script': '/static/custom-elements/accounting/accounting-journals/accounting-journals.js',
            #     'async': True
            # },
            # {
            #     'type': 'module',
            #     'script': '/static/custom-elements/accounting/account-selector/account-selector.js',
            #     'async': True
            # },
            # {
            #     'type': 'module',
            #     'script': '/static/custom-elements/accounting/account-selector/account-selector-view.js',
            #     'async': True
            # },
            # {
            #     'type': 'module',
            #     'script': '/static/custom-elements/accounting/account-group/account-group.js',
            #     'async': True
            # },
            {
                'type': 'module',
                'script': '/static/custom-elements/accounting/invoices/invoice-dashboard/invoice-dashboard.js',
                'async': True
            }
        ],
        'elements': [
            {
                'tag': 'account-editor',
                'script': '/static/custom-elements/accounting/account-editor/account-editor.js'
            },
            {
                'tag': 'account-selector',
                'script': '/static/custom-elements/accounting/account-selector/account-selector.js'
            },
            {
                'tag': 'account-selector-view',
                'script': '/static/custom-elements/accounting/account-selector/account-selector-view.js'
            },
            {
                'tag': 'account-group',
                'script': '/static/custom-elements/accounting/account-group/account-group.js'
            }
            {
                'tag': 'account-tree',
                'script': '/static/custom-elements/accounting/account-tree/account-tree.js'
            },
            {
                'tag': 'accounting-journal',
                'script': '/static/custom-elements/accounting/accounting-journal/accounting-journal.js'
            },
            {
                'tag': 'accounting-journals',
                'script': '/static/custom-elements/accounting/accounting-journals/accounting-journals.js'
            },
            {
                'tag': 'invoice-dashboard',
                'script': '/static/custom-elements/accounting/invoices/invoice-dashboard/invoice-dashboard.js'
            }
        ]
    }