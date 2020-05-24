import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config

@view_config(
    route_name='accounting.accounts.all',
    request_method='GET',
    renderer='saas.app.modules.accounting:templates/default.html'
)
def view_accounting_accounts_all(request):
    return {}

@view_config(
    route_name='accounting.accounts.add',
    request_method='GET',
    renderer='saas.app.modules.accounting:templates/accounts/add.html'
)
def view_accounting_accounts_add(request):
    return {}