import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: saas.app.modules.accounting.views.api')

    config.add_route(
        'api.accounting.accounts.types',
        '/api/accounting/accounts/types'
    )

    config.add_route(
        'api.accounting.accounts.add',
        '/api/accounting/accounts/add'
    )