import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception


@view_config(
    route_name='api.accounting.groups.add',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def api_accounting_groups_add(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    group_id = params['groupId'] if 'groupId' in params else None
    type_id = params['typeId'] if 'typeId' in params else None
    name = params['name'] if 'name' in params else None
    description = params['description'] if 'description' in params else None

    if client_id is None or group_id is None or type_id is None or name is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id, Group Id, Type Id and Name is required'
        )

    services = request.services()
    try:
        store = services['store.accounting.groups']
        store.add(client_id, group_id, type_id, name, description)
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


@view_config(
    route_name='api.accounting.groups.update',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def api_accounting_groups_update(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    group_id = params['groupId'] if 'groupId' in params else None
    type_id = params['typeId'] if 'typeId' in params else None
    name = params['name'] if 'name' in params else None
    description = params['description'] if 'description' in params else None

    if client_id is None or group_id is None or type_id is None or name is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id, Group Id, Type Id and Name is required'
        )

    services = request.services()
    try:
        store = services['store.accounting.groups']
        store.update(client_id, group_id, type_id, name, description)
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


@view_config(
    route_name='api.accounting.groups.tree',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def api_accounting_groups_tree(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None

    if client_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id is required'
        )

    services = request.services()
    groups = []
    try:
        store = services['store.accounting.groups']
        result = store.tree(client_id)
        groups = [
            {
                'group_id': r[0],
                'name': r[1],
                'level': r[2]
            }
            for r in result
        ]
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail=f'{len(groups)} account groups found',
        body={
            'groups': groups
        }
    )


@view_config(
    route_name='api.accounting.groups.assign',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def api_accounting_groups_assign(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    group_id = params['groupId'] if 'groupId' in params else None
    parent_group_id = params['parentGroupId'] if 'parentGroupId' in params else None


    if client_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id is required'
        )

    services = request.services()
    store = services['store.accounting.groups']
    try:
        store.assignParent(client_id, group_id, parent_group_id)
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Account assigned to group',
        body={
            'message': 'Account assigned to group'
        }
    )