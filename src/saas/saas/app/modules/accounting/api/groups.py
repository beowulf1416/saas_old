import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception


@view_config(
    route_name='api.accounting.groups.add',
    request_method='POST',
    renderer='json'
)
def api_accounting_groups_add(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    group_id = params['groupId'] if 'groupId' in params else None
    name = params['name'] if 'name' in params else None
    description = params['description'] if 'description' in params else None

    if client_id is None or group_id is None or name is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id, Group Id and Name is required'
        )

    services = request.services()
    try:
        store = services['store.accounting.groups']
        store.add(client_id, group_id, name, description)
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Account Group added',
        body={
            'message': 'Account Group added'
        }
    )