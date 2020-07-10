import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception

from jsonschema import validate
from jsonschema.exceptions import ValidationError
import json


@view_config(
    route_name='api.purchasing.vendors.add',
    request_method='POST',
    renderer='json'
)
def api_purchasing_vendor_add(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    vendor_id = params['vendorId'] if 'vendorId' in params else None
    name = params['name'] if 'name' in params else None
    address = params['address'] if 'address' in params else None
    country_id = params['countryId'] if 'countryId' in params else None

    if client_id is None or vendor_id is None or name is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id, Vendor Id and Name is required'
        )

    services = request.services()
    vendorStore = services['store.purchasing.vendors']
    try:
        vendorStore.add(client_id, vendor_id, name, address, country_id)
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='vendor record created',
        body={
            'message': 'vendor record created'
        }
    )

@view_config(
    route_name='api.purchasing.vendors.update',
    request_method='POST',
    renderer='json'
)
def api_purchasing_vendor_update(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    vendor_id = params['vendorId'] if 'vendorId' in params else None
    name = params['name'] if 'name' in params else None
    address = params['address'] if 'address' in params else None
    country_id = params['countryId'] if 'countryId' in params else None

    if client_id is None or vendor_id is None or name is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id, Vendor Id and Name is required'
        )

    services = request.services()
    vendorStore = services['store.purchasing.vendors']
    try:
        vendorStore.update(client_id, vendor_id, name, address, country_id)
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='vendor record updated',
        body={
            'message': 'vendor record updated'
        }
    )

@view_config(
    route_name='api.purchasing.vendors.assign',
    request_method='POST',
    renderer='json'
)
def api_purchasing_vendor_update(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    vendor_id = params['vendorId'] if 'vendorId' in params else None
    organization_id = params['organizationId'] if 'organizationId' in params else None

    if client_id is None or vendor_id is None or organization_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id, Vendor Id and Organization Id is required'
        )

    services = request.services()
    vendorStore = services['store.purchasing.vendors']
    try:
        vendorStore.assignOrganization(client_id, vendor_id, organization_id)
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='vendor record created',
        body={
            'message': 'vendor record created'
        }
    )

@view_config(
    route_name='api.purchasing.vendors.filter',
    request_method='POST',
    renderer='json'
)
def api_purchasing_vendors_filter(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    filter = params['filter'] if 'filter' in params else None

    if client_id is None or filter is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id and filter is required'
        )

    services = request.services()
    vendorStore = services['store.purchasing.vendors']
    vendors = []
    try:
        result = vendorStore.filter(client_id, filter)
        vendors = [
            {
                'id': r[0],
                'name': r[1]
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
        detail=f'{len(vendors)} vendors found',
        body={
            'vendors': vendors
        }
    )

@view_config(
    route_name='api.purchasing.vendors.get',
    request_method='POST',
    renderer='json'
)
def api_purchasing_vendor_get(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    vendor_id = params['vendorId'] if 'vendorId' in params else None

    if client_id is None or filter is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id and filter is required'
        )

    services = request.services()
    vendorStore = services['store.purchasing.vendors']
    vendor = {}
    try:
        r = vendorStore.get(client_id, vendor_id)
        vendor = {
            'id': r[0],
            'name': r[1],
            'address': r[2],
            'country_id': r[3]
        }
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='vendor found',
        body={
            'vendor': vendor
        }
    )