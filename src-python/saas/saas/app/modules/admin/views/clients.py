import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config


@view_config(
    route_name='admin.clients',
    request_method='GET',
    renderer='saas.app.modules.admin:templates/clients/default.html'
)
def view_clients_default(request):
    log.debug('view: view_clients_default')
    return {}

@view_config(
    route_name='admin.clients.list',
    request_method='GET',
    renderer='saas.app.modules.admin:templates/clients/list.html'
)
def view_clients_list(request):
    return {}


@view_config(
    route_name='admin.clients.add',
    request_method='GET',
    renderer='saas.app.modules.admin:templates/clients/add.html'
)
def view_client_add(request):
    return {}