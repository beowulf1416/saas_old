import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception


@view_config(
    route_name='api.clients.organizations.add',
    request_method='POST',
    renderer='json'
)
def view_clients_organizations_add(request):
    params = request.json_body
    name = params['name'] if 'name' in params else None
    description = params['description'] if 'description' in params else None

    if name is None or description is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Organization name and description is required'
        )

    session = request.session
    client_id = session['client']

    services = request.services()
    try:
        orgStore = services['store.clients.organizations']
        result = orgStore.add(client_id, name, description)
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )
        
    raise exception.HTTPOk(
        detail='Client added',
        body={'message': 'Client Organization added'}
    )

    return {}