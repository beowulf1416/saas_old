import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config


@view_config(
    route_name='inventory.warehouses',
    request_method='GET',
    renderer='saas.app.modules.inventory:templates/warehouses/list.html'
)
def view_inventory_warehouses_list(request):
    return {}