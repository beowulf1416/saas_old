import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config


@view_config(
    route_name='inventory.dashboard',
    request_method='GET',
    renderer='saas.app.modules.inventory:templates/default.html'
)
def view_inventory_dashboard(request):
    return {}