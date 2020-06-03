import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config


@view_config(
    route_name='inventory.items.add',
    request_method='GET',
    renderer='saas.app.modules.inventory:templates/items/item.html'
)
def view_inventory_item_add(request):
    return {}

@view_config(
    route_name='inventory.items.list',
    request_method='GET',
    renderer='saas.app.modules.inventory:templates/items/list.html'
)
def view_inventory_items_list(request):
    return {}


@view_config(
    route_name='inventory.items.groups',
    request_method='GET',
    renderer='saas.app.modules.inventory:templates/items/groups.html'
)
def view_inventory_items_groups(request):
    return {}