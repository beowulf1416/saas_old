import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: saas.app.modules.accounting.api')

    # accounts
    config.add_route(
        'api.accounting.accounts.types',
        '/api/accounting/accounts/types'
    )

    config.add_route(
        'api.accounting.accounts.add',
        '/api/accounting/accounts/add'
    )

    config.add_route(
        'api.accounting.accounts.get',
        '/api/accounting/accounts/get'
    )

    config.add_route(
        'api.accounting.accounts.assign.parent',
        '/api/accounting/accounts/parent/assign'
    )
    
    config.add_route(
        'api.accounting.accounts.all',
        '/api/accounting/accounts/all'
    )

    config.add_route(
        'api.accounting.accounts.children',
        '/api/accounting/accounts/children'
    )

    config.add_route(
        'api.accounting.account.tree',
        '/api/accounting/accounts/tree'
    )

    config.add_route(
        'api.accounting.accounts.filter',
        '/api/accounting/accounts/filter'
    )

    # groups
    config.add_route(
        'api.accounting.groups.add',
        '/api/accounting/groups/add'
    )

    config.add_route(
        'api.accounting.groups.tree',
        '/api/accounting/groups/tree'
    )

    # transactions
    config.add_route(
        'api.accounting.transactions.add',
        '/api/accounting/transactions/add'
    )

    config.add_route(
        'api.accounting.transactions.update',
        '/api/accounting/transactions/update'
    )

    config.add_route(
        'api.accounting.transactions.get',
        '/api/accounting/transactions/get'
    )

    config.add_route(
        'api.accounting.transactions.filter',
        '/api/accounting/transactions/filter'
    )

    config.add_route(
        'api.accounting.transactions.post',
        '/api/accounting/transactions/post'
    )