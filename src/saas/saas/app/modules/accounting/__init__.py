import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service

def includeme(config):
    log.info('including: saas.app.modules.accounting')

    config.include('saas.app.modules.accounting.stores')
    config.include('saas.app.modules.accounting.views')
    config.include('saas.app.modules.accounting.views.api')

    services = get_service(None)

    navigators = services['navigators']
    navigators['accounting'] = {
        'title': 'Accounting',
        'help': 'Accounting',
        'icon': '<span class="material-icons">account_balance</span>',
        'template': 'saas.app.modules.accounting:templates/module.html'
    }