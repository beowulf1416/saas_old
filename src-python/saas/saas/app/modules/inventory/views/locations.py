import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config


@view_config(
    route_name='inventory.locations',
    request_method='GET',
    renderer='saas.app.modules.inventory:templates/locations/list.html'
)
def view_inventory_locations_list(request):
    return {}