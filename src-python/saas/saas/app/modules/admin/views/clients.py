import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config


@view_config(
    route_name='admin.clients',
    request_method='GET',
    renderer='saas.app.modules.admin:templates/clients/default.html'
)
def view_clients(request):
    log.debug('view: view_clients')
    return {}