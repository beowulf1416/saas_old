import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception


@view_config(
    route_name='api.clients.roles.all',
    request_method='POST',
    accept='application/json',
    permission='admin.clients'
)
def view_clients_roles_all(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None

    if client_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id is required'
        )

    roles = []
    services = request.services()
    try:
        rolesStore = services['store.admin.roles']
        result = rolesStore.getAll(client_id)
        roles = [{
            'id': r[0],
            'active': r[1],
            'name': r[2]
        } for r in result]
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
    route_name='api.clients.roles.add',
    request_method='POST',
    accept='application/json',
    permission='admin.clients'
)
def view_clients_roles_add(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    name = params['name'] if 'name' in params else None

    if client_id is None or name is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id and Role Name is required'
        )

    services = request.services()
    try:
        rolesStore = services['store.admin.roles']
        rolesStore.add(client_id, name)
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Client Role added',
        body={'message': 'Client Role added'}
    )

@view_config(
    route_name='api.clients.roles.active',
    request_method='POST',
    accept='application/json',
    permission='admin.clients'
)
def view_clients_role_active(request):
    params = request.json_body
    role_id = params['roleId'] if 'roleId' in params else None
    active = params['active'] if 'active' in params else None

    if role_id is None or active is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Role Id and Active status is required'
        )

    services = request.services()
    try:
        rolesStore = services['store.admin.roles']
        rolesStore.setActive(role_id, active)
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Client Role active status updated',
        body={'message': 'Client Role active status updated'}
    )

@view_config(
    route_name='api.clients.roles.permissions.all',
    request_method='POST',
    accept='application/json',
    permission='admin.clients'
)
def view_clients_roles_permissions(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    role_id = params['roleId'] if 'roleId' in params else None

    if client_id is None or role_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id and Role Id is required'
        )

    permissions = []
    services = request.services()
    try:
        rolesStore = services['store.admin.roles']
        result = rolesStore.permissions(client_id, role_id)
        permissions = [{
            'id': r[0],
            'active': r[1],
            'name': r[2]
        } for r in result]
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='{0} client roles found'.format(len(permissions)),
        body={
            'permissions': permissions
        }
    )


@view_config(
    route_name='api.clients.roles.permissions.add',
    request_method='POST',
    accept='application/json',
    permission='admin.clients'
)
def view_client_role_permission_assign(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    role_id = params['roleId'] if 'roleId' in params else None
    permission_ids = params['permissionIds'] if 'permissionIds' in params else None

    if client_id is None or role_id is None or permission_ids is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id, Role Id and Permission Ids are required'
        )

    services = request.services()
    try:
        rolesStore = services['store.admin.roles']
        rolesStore.assignPermissions(client_id, role_id, permission_ids)
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='client role permissions assigned',
        body={ 'message': 'Client Role permissions assigned' }
    )

@view_config(
    route_name='api.clients.roles.permissions.remove',
    request_method='POST',
    accept='application/json',
    permission='admin.clients'
)
def view_client_roles_permission_remove(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    role_id = params['roleId'] if 'roleId' in params else None
    permission_id = params['permissionId'] if 'permissionId' in params else None

    if client_id is None or role_id is None or permission_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id, Role Id and Permission Id is required'
        )

    services = request.services()
    try:
        rolesStore = services['store.admin.roles']
        rolesStore.removePermission(client_id, role_id, permission_id)
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='client role permission removed',
        body={ 'message': 'Client Role permission removed' }
    )
