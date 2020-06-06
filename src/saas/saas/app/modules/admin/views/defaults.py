import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config


@view_config(
    route_name='admin.dashboard',
    request_method='GET',
    renderer='saas.app.modules.admin:templates/default.html',
    # permission='admin.dashboard' # todo need to specify a permission
)
def view_dashboard(request):
    log.debug('view: view_dashboard')
    return {}