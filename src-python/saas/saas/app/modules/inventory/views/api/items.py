import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config


@view_config(
    route_name='api.inventory.items.filter',
    request_method='POST',
    renderer='json'
)
def view_inventory_items_filter(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None

    if client_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id is required'
        )

    services = request.services()
    items = []
    try:
        itemsStore = services['store.inventory.items']
        result = itemsStore.filterItems(client_id, filter)
        items = [
            { 'id': r[0], 'type_id': r[1], 'name': r[2], 'description': r[3], 'level': r[4], 'path': r[5] }
            for r in result
        ]
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='{0} items found'.format(len(items)),
        body={
            'items': items
        }
    )