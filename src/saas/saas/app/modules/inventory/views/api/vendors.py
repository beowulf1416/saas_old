import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception

from jsonschema import validate
from jsonschema.exceptions import ValidationError
import json


@view_config(
    route_name='api.inventory.vendors.add',
    request_method='POST',
    renderer='json'
)
def api_inventory_vendor_add(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    vendor_id = params['vendorId'] if 'vendorId' in params else None
    name = params['name'] if 'name' in params else None
    address = params['address'] if 'address' in params else None
    country_id = params['countryId'] if 'countryId' in params else None

    if client_id is None or vendor_id is None or name is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id and name is required'
        )

    services = request.services()
    vendorStore = services['store.inventory.vendors']
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