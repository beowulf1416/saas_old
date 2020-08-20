import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception


@view_config(
    route_name='api.client.get',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def api_client_get(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None

    if client_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id is required'
        )

    services = request.services()
    clientStore = services['store.client']
    client = {}
    try:
        result = clientStore.getClient(client_id)
        client = {
            'id': result[0],
            'active': result[1],
            'name': result[2],
            'address': result[3],
            'country_id': result[4]
        }
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Client found',
        body={
            'client': client
        }
    )

@view_config(
    route_name='api.client.join',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def api_client_join(request):
    params = request.json_body
    client = params['client'] if 'client' in params else None

    if client is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Name is required'
        )

    session = request.session
    services = request.services()
    clients = services['store.client']
    users = services['store.user']
    try:
        current_email = session['email']
        user = users.userByEmail(current_email)
        user_id = user[0]

        client_id = clients.by_name(client)
        if client_id is None:
            raise exception.HTTPBadRequest(
                detail = 'Client not found',
                explanation = f"Client with name '${client}' not found"
            )

        clients.join(client_id, user_id)
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Request to join client recorded',
        body={
            'message': 'Request to join client recorded'
        }
    )