import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception

from jsonschema import validate
from jsonschema.exceptions import ValidationError
import json


@view_config(
    route_name='api.inventory.locations.add',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def api_inventory_locations_add(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    location_id = params['locationId'] if 'locationId' in params else None
    warehouse_id = params['warehouseId'] if 'warehouseId' in params else None
    name = params['name'] if 'name' in params else None
    floor_id = params['floorId'] if 'floorId' in params else None
    aisle_id = params['aisleId'] if 'aisleId' in params else None
    shelf_id = params['shelfId'] if 'shelfId' in params else None
    rack_id = params['rackId'] if 'rackId' in params else None
    level_id = params['levelId'] if 'levelId' in params else None
    bin_id = params['binId'] if 'binId' in params else None

    if client_id is None or location_id is None or warehouse_id is None or name is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id, Warehouse Id and name is required'
        )

    services = request.services()
    store = services['store.inventory.locations']
    try:
        store.add(
            client_id,
            location_id,
            warehouse_id,
            name,
            floor_id,
            aisle_id,
            shelf_id,
            rack_id,
            level_id,
            bin_id
        )
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Inventory Location created',
        body={
            'message': 'Inventory Location created'
        }
    )

@view_config(
    route_name='api.inventory.locations.update',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def api_inventory_locations_update(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    location_id = params['locationId'] if 'locationId' in params else None
    warehouse_id = params['warehouseId'] if 'warehouseId' in params else None
    name = params['name'] if 'name' in params else None
    floor_id = params['floorId'] if 'floorId' in params else None
    aisle_id = params['aisleId'] if 'aisleId' in params else None
    shelf_id = params['shelfId'] if 'shelfId' in params else None
    rack_id = params['rackId'] if 'rackId' in params else None
    level_id = params['levelId'] if 'levelId' in params else None
    bin_id = params['binId'] if 'binId' in params else None

    if client_id is None or location_id is None or warehouse_id is None or name is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id, Warehouse Id and name is required'
        )

    services = request.services()
    store = services['store.inventory.locations']
    try:
        store.update(
            client_id,
            location_id,
            warehouse_id,
            name,
            floor_id,
            aisle_id,
            shelf_id,
            rack_id,
            level_id,
            bin_id
        )
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Inventory Location update',
        body={
            'message': 'Inventory Location update'
        }
    )

@view_config(
    route_name='api.inventory.locations.filter',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def api_inventory_locations_filter(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    filter = params['filter'] if 'filter' in params else None

    if client_id is None or filter is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id and filter is required'
        )

    services = request.services()
    store = services['store.inventory.locations']
    locations = []
    try:
        result = store.update(
            client_id,
            filter
        )
        locations = [
            {
                'id': r[0],
                'warehouseId': r[1],
                'name': r[2],
                'floorId': r[3],
                'aisleId': r[4],
                'shelfId': r[5],
                'rackId': r[6],
                'levelId': r[7],
                'binId': r[8]
            }
            for r in result
        ]
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail=f'{len(locations)} locations found',
        body={
            'locations': locations
        }
    )