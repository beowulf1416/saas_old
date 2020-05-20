import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception

import json


@view_config(
    route_name='api.clients.all',
    request_method='POST',
    renderer='json'
)
def api_clients_all(request):
    clients = []
    services = request.services()
    try:
        clientsStore = services['store.admin.clients']
        result = clientsStore.getAll()
        clients = [{ 'id': c[0], 'active': c[1], 'name': c[2]} for c in result]
        # return {
        #     'status': 'success',
        #     'message': '{0} clients'.format(len(clients)),
        #     'json': json.dumps(result)
        # }
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=e,
            explanation=e
        )
        # return {
        #     'status': 'error',
        #     'message': 'An error occured while retrieving clients',
        #     'json': None
        # }
    raise exception.HTTPOk(
        detail='{0} clients'.format(len(clients)),
        body={ 'clients': clients }
    )

@view_config(
    route_name='api.clients.setactive',
    request_method='POST',
    # renderer='json'
)
def view_client_set_active(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    active = params['active'] if 'active' in params else None

    if client_id is None or active is None:    
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id and Active state is required'
        )

    services = request.services()
    try:
        clientsStore = services['store.admin.clients']
        clientsStore.setActive(client_id, active)
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=e,
            explanation=e
        )

    raise exception.HTTPOk(
        detail='Client active state changed',
        body={'message': 'Client active state changed'}
    )