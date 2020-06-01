import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config

@view_config(
    route_name = 'clients.home',
    request_method='GET',
    renderer='saas.app.modules.clients:templates/default.html'
)
def view_client_home(request):
    return {}


@view_config(
    route_name = 'clients.organizations',
    request_method='GET',
    renderer='saas.app.modules.clients:templates/organizations/default.html'
)
def view_client_organizations(request):
    return {}