import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception


@view_config(
    route_name='api.clients.users.add',
    request_method='POST',
    accept='application/json',
    permission='admin.clients'
)
def view_clients_user_add(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    email = params['email'] if 'email' in params else None

    if client_id is None or email is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id is required'
        )

    services = request.services()
    try:
        userStore = services['store.user']
        user = userStore.userByEmail(email)
        user_id = user[0]

        usersStore = services['store.admin.users']
        usersStore.addClientUser(client_id, user_id)
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
            
        )

    raise exception.HTTPOk(
        detail='Client User added',
        body={'message': 'Client User added'}
    )

@view_config(
    route_name='api.clients.users.all',
    request_method='POST',
    accept='application/json',
    permission='admin.clients'
)
def view_clients_users_all(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None

    if client_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id is required'
        )

    users = []
    services = request.services()
    try:
        usersStore = services['store.admin.users']
        result = usersStore.getAllClientUsers(client_id)
        users = [{
            'id': r[0],
            'active': r[1],
            'email': r[2],
            'name': r[3]
        } 
        for r in result]
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='{0} client users found'.format(len(users)),
        body={
            'users': users
        }
    )