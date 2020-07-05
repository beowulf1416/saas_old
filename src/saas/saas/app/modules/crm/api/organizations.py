import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception

from jsonschema import validate
from jsonschema.exceptions import ValidationError
import json


@view_config(
    route_name='api.crm.organizations.save',
    request_method='POST',
    renderer='json'
)
def api_crm_organizations_save(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    org_id = params['organizationId'] if 'organizationId' in params else None
    name = params['name'] if 'name' in params else None
    address = params['address'] if 'address' in params else None
    country_id = params['countryId'] if 'countryId' in params else None

    if client_id is None or org_id is None or name is None or country_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id, Organization Id, Name or Country is required'
        )

    services = request.services()
    orgStore = services['store.crm.organizations']
    try:
        orgStore.save(client_id, org_id, name, address, country_id)
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Organization saved',
        body={
            'message': 'Organization saved'
        }
    )