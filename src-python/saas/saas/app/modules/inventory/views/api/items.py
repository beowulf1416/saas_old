import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception

from jsonschema import validate
from jsonschema.exceptions import ValidationError
import json


@view_config(
    route_name='api.inventory.items.filter',
    request_method='POST',
    renderer='json'
)
def view_inventory_items_filter(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    filter = params['filter'] if 'filter' in params else ''
    num_items = params['numItems'] if 'numItems' in params else 20
    page_num = params['pageNum'] if 'pageNum' in params else 1

    if client_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id is required'
        )

    services = request.services()
    items = []
    try:
        itemsStore = services['store.inventory.items']
        result = itemsStore.filterItems(client_id, filter, num_items, page_num)
        items = [
            { 
                'id': r[0], 
                'active': r[1], 
                'name': r[2], 
                'description': r[3], 
                'make': r[4], 
                'brand': r[5],
                'model': r[6],
                'version': r[7],
                'sku': r[8],
                'upc': r[9]
            }
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
            'items': items,
            'filter': filter
        }
    )

@view_config(
    route_name='api.inventory.items.add',
    request_method='POST',
    renderer='json'
)
def view_inventory_items_add(request):
    params = request.json_body
    
    client_id = params['clientId'] if 'clientId' in params else None
    if client_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id is required'
        )

    services = request.services()
    itemStore = services['store.inventory.items']
    validator = services['validator.json']
    try:
        # validate( instance = params, schema = schema)
        validator.validate(
            instance = params,
            schema_file = '/inventory/item.json'
        )

        itemStore.add(client_id, params)
    except ValidationError as e:
        log.error(e)
        raise exception.HTTPBadRequest(
            detail=e.message,
            explanation='Incorrect parameters'
        )
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Inventory Item record created',
        body={
            'message': 'Inventory Item record created'
        }
    )

@view_config(
    route_name='api.inventory.items.substitutes',
    request_method='POST',
    renderer='json'
)
def view_inventory_item_substitutes(request):
    params = request.json_body
    client_id = params['client'] if 'client' in params else None
    if client_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id is required'
        )

    services = request.services()
    itemStore = services['store.inventory.items']
    items = []
    try:
        items = itemStore.substitutes(client_id)
    except ValidationError as e:
        log.error(e)
        raise exception.HTTPBadRequest(
            detail=e.message,
            explanation='Incorrect parameters'
        )
    except Exception as e:
        log.error(e)
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

@view_config(
    route_name='api.inventory.items.substitutes.add',
    request_method='POST',
    renderer='json'
)
def view_inventory_item_substitutes_add(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    item_id = params['itemId'] if 'itemId' in params else None
    substitute_item_id = params['substituteItemId'] if 'substituteItemId' in params else None

    if client_id is None or item_id is None or substitute_item_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id, Item Id and Substitute Item Id is required'
        )

    services = request.services()
    itemStore = services['store.inventory.items']
    try:
        itemStore.addSubstitute(client_id, item_id, substitute_item_id)
    except ValidationError as e:
        log.error(e)
        raise exception.HTTPBadRequest(
            detail=e.message,
            explanation='Incorrect parameters'
        )
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Inventory Item Substitute record created',
        body={
            'message': 'Inventory Item Substitute record created'
        }
    )