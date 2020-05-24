import logging
log = logging.getLogger(__name__)


def includeme(config):
    log.info('including: saas.app.modules.accounting.views')

    config.add_route(
        'accounting.default',
        '/accounting'
    )

    config.add_route(
        'accounting.accounts.all',
        '/accounting/accounts/all'
    )

    config.add_route(
        'accounting.accounts.add',
        '/accounting/accounts/add'
    )