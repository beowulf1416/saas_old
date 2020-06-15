import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception


@view_config(
    route_name='api.inventory.warehouses.add',
    request_method='POST',
    renderer='json'
)
def view_inventory_warehouses_add(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    name = params['name'] if 'name' in params else None
    address = params['address'] if 'address' in params else ''

    if client_id is None or name is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id and Name is required'
        )

    services = request.services()
    try:
        warehouseStore = services['store.inventory.warehouses']
        warehouseStore.add(client_id, name, address)
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Inventory Warehouse added',
        body={
            'message': 'Inventory Warehouse added'
        }
    )

@view_config(
    route_name='api.inventory.warehouses.all',
    request_method='POST',
    renderer='json'
)
def view_inventory_warehouses_all(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None

    if client_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id is required'
        )

    services = request.services()
    warehouses = []
    try:
        warehouseStore = services['store.inventory.warehouses']
        result = warehouseStore.all(client_id)
        warehouses = [
            {
                'id': r[0],
                'active': r[1],
                'name': r[2],
                'address': r[3]
            }
            for r in result
        ]
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='{0} inventory warehouses found'.format(len(warehouses)),
        body={
            'warehouses': warehouses
        }
    )


@view_config(
    route_name='api.inventory.warehouses.filter',
    request_method='POST',
    renderer='json'
)
def view_inventory_warehouses_filter(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    filter = params['filter'] if 'filter' in params else None

    if client_id is None or filter is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id and Filter is required'
        )

    services = request.services()
    warehouses = []
    try:
        warehouseStore = services['store.inventory.warehouses']
        result = warehouseStore.filter(client_id, filter)
        warehouses = [
            {
                'id': r[0],
                'active': r[1],
                'name': r[2],
                'address': r[3]
            }
            for r in result
        ]
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='{0} inventory warehouses found'.format(len(warehouses)),
        body={
            'warehouses': warehouses
        }
    )


@view_config(
    route_name='api.inventory.warehouses.get',
    request_method='POST',
    renderer='json'
)
def view_inventory_warehouses_get(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    warehouse_id = params['warehouseId'] if 'warehouseId' in params else None

    if client_id is None or filter is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id and Warehouse Id is required'
        )

    services = request.services()
    warehouse = {}
    try:
        warehouseStore = services['store.inventory.warehouses']
        r = warehouseStore.get(client_id, warehouse_id)
        warehouses = {
                'id': r[0],
                'active': r[1],
                'name': r[2],
                'address': r[3]
            }
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='inventory warehouses found',
        body={
            'warehouse': warehouse
        }
    )