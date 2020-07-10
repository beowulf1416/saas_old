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
    user_ids = params['userIds'] if 'userIds' in params else None

    if client_id is None or user_ids is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id and User Id is required'
        )

    services = request.services()
    try:
        usersStore = services['store.admin.users']
        usersStore.addClientUsers(client_id, user_ids)
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
    route_name='api.clients.users.remove',
    request_method='POST',
    accept='application/json',
    permission='admin.clients'
)
def view_clients_user_remove(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    user_id = params['userId'] if 'userId' in params else None

    if client_id is None or user_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id and User Id is required'
        )

    services = request.services()
    try:
        usersStore = services['store.admin.users']
        usersStore.removeClientUser(client_id, user_id)
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
            
        )

    raise exception.HTTPOk(
        detail='Client User removed',
        body={'message': 'Client User removed'}
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

@view_config(
    route_name='api.clients.users.roles.all',
    request_method='POST',
    accept='application/json',
    permission='admin.clients'
)
def view_client_user_roles_all(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    user_id = params['userId'] if 'userId' in params else None

    if client_id is None or user_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id and User Id is required'
        )

    roles = []
    services = request.services()
    try:
        usersStore = services['store.admin.users']
        result = usersStore.clientRoles(client_id, user_id)
        roles = [
            { 
                'id': r[0], 
                'active': r[1], 
                'name': r[2] 
            }
            for r in result
        ]
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='{0} client roles found'.format(len(roles)),
        body={
            'roles': roles
        }
    )

@view_config(
    route_name='api.clients.users.roles.add',
    request_method='POST',
    accept='application/json',
    permission='admin.clients'
)
def view_client_user_roles_add(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    user_id = params['userId'] if 'userId' in params else None
    role_ids = params['roleIds'] if 'roleIds' in params else None

    if client_id is None or user_id is None or role_ids is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id, User Id and Role Ids are required'
        )

    services = request.services()
    try:
        usersStore = services['store.admin.users']
        usersStore.addClientUserRoles(client_id, user_id, role_ids)
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Client User Roles added',
        body={
            'message': 'Client User Roles added'
        }
    )

@view_config(
    route_name='api.clients.users.roles.remove',
    request_method='POST',
    accept='application/json',
    permission='admin.clients'
)
def view_client_user_roles_remove(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    user_id = params['userId'] if 'userId' in params else None
    role_id = params['roleId'] if 'roleId' in params else None

    if client_id is None or user_id is None or role_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id, User Id and Role Id is required'
        )

    services = request.services()
    try:
        usersStore = services['store.admin.users']
        usersStore.removeClientUserRole(client_id, user_id, role_id)
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Client User Roles removed',
        body={
            'message': 'Client User Roles removed'
        }
    )

@view_config(
    route_name='api.users.filter',
    request_method='POST',
    accept='application/json',
    permission='admin.clients'
)
def view_users_filter(request):
    params = request.json_body
    filter = params['filter'] if 'filter' in params else None

    if filter is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Filter is required'
        )

    services = request.services()
    users = []
    try:
        usersStore = services['store.admin.users']
        result = usersStore.filter(filter)
        users = [
            {
                'id': r[0],
                'active': r[1],
                'email': r[2],
                'name': r[3]
            }
            for r in result
        ]
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='{0} users found'.format(len(users)),
        body={
            'users': users
        }
    )