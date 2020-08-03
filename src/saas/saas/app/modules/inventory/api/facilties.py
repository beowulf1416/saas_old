import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception

from jsonschema import validate
from jsonschema.exceptions import ValidationError
import json


@view_config(
    route_name='api.inventory.facilities.add',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def api_inventory_facility_add(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    facility_id = params['facilityId'] if 'facilityId' in params else None
    name = params['name'] if 'name' in params else None
    description = params['description'] if 'description' in params else None
    address = params['address'] if 'address' in params else None
    country_id = params['countryId'] if 'countryId' in params else None
    area = params['area'] if 'area' in params else None
    area_uom_id = params['areaUomId'] if 'areaUomId' in params else None

    if client_id is None or facility_id is None or name is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id, Facility Id and name is required'
        )

    services = request.services()
    store = services['store.inventory.facilities']
    try:
        store.add(
            client_id,
            facility_id,
            name,
            description,
            address,
            country_id,
            area,
            area_uom_id
        )
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='facility added',
        body={
            'message': 'facility added'
        }
    )

@view_config(
    route_name='api.inventory.facilities.update',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def api_inventory_facility_update(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    facility_id = params['facilityId'] if 'facilityId' in params else None
    name = params['name'] if 'name' in params else None
    description = params['description'] if 'description' in params else None
    address = params['address'] if 'address' in params else None
    country_id = params['countryId'] if 'countryId' in params else None
    area = params['area'] if 'area' in params else None
    area_uom_id = params['areaUomId'] if 'areaUomId' in params else None

    if client_id is None or facility_id is None or name is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id, Facility Id and name is required'
        )

    services = request.services()
    store = services['store.inventory.facilities']
    try:
        store.update(
            client_id,
            facility_id,
            name,
            description,
            address,
            country_id,
            area,
            area_uom_id
        )
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='facility updated',
        body={
            'message': 'facility updated'
        }
    )


@view_config(
    route_name='api.inventory.facilities.filter',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def api_inventory_facility_filter(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    filter = params['filter'] if 'filter' in params else None

    if client_id is None or filter is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id and filter is required'
        )

    services = request.services()
    store = services['store.inventory.facilities']
    facilities = []
    try:
        result = store.filter(
            client_id,
            filter
        )
        facilities = [
            {
                'facilityId': r[0],
                'active': r[1],
                'created': r[2],
                'name': r[3],
                'description': r[4],
                'address': r[5],
                'countryId': r[6],
                'area': r[7],
                'areaUomId': r[8]
            }
            for r in result
        ]
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail=f'{len(facilities)} facilities found',
        body={
            'facilities': facilities
        }
    )

@view_config(
    route_name='api.inventory.facilities.get',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def api_inventory_facility_filter(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    facility_id = params['facilityId'] if 'facilityId' in params else None

    if client_id is None or facility_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id and Facility Id is required'
        )

    services = request.services()
    store = services['store.inventory.facilities']
    facility = {}
    try:
        r = store.get(
            client_id,
            facility_id
        )
        facility = {
            'facilityId': r[0],
            'active': r[1],
            'created': r[2],
            'name': r[3],
            'description': r[4],
            'address': r[5],
            'countryId': r[6],
            'area': r[7],
            'areaUomId': r[8]
        }
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='facility found',
        body={
            'facility': facility
        }
    )