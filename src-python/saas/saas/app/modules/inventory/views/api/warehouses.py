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
        warehouses = warehouseStore.add(client_id)
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