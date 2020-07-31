import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception


@view_config(
    route_name='api.clients.organizations.add',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def view_clients_organizations_add(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    organization_id = params['organizationId'] if 'organizationId' in params else None
    name = params['name'] if 'name' in params else None
    description = params['description'] if 'description' in params else None

    if client_id is None or organization_id is None or  name is None or description is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id, Organization Id, Name and Description is required'
        )

    session = request.session
    client_id = session['client']

    services = request.services()
    try:
        orgStore = services['store.clients.organizations']
        result = orgStore.add(client_id, organization_id, name, description)
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


@view_config(
    route_name='api.clients.organizations.update',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def view_clients_organizations_update(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    org_id = params['organizationId'] if 'organizationId' in params else None
    name = params['name'] if 'name' in params else None
    description = params['description'] if 'description' in params else None

    if client_id is None or org_id is None or name is None or description is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id, Organization Id, name and description is required'
        )

    session = request.session
    client_id = session['client']

    services = request.services()
    try:
        orgStore = services['store.clients.organizations']
        result = orgStore.update(client_id, org_id, name, description)
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )
        
    raise exception.HTTPOk(
        detail='Client Organization updated',
        body={'message': 'Client Organization updated'}
    )


@view_config(
    route_name='api.clients.organizations.tree',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def view_clients_organizations_tree(request):
    session = request.session
    client_id = session['client']

    organizations = []
    services = request.services()
    try:
        orgStore = services['store.clients.organizations']
        result = orgStore.tree(client_id)
        organizations = [
            { 'id': r[0], 'name': r[1], 'description': r[2], 'level': r[3] }
            for r in result
        ]
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )
        
    raise exception.HTTPOk(
        detail='{0} organizations found'.format(len(organizations)),
        body={
            'organizations': organizations
        }
    )

@view_config(
    route_name='api.clients.organizations.assign.parent',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def view_clients_organizations_set_parent(request):
    params = request.json_body
    org_id = params['organizationId'] if 'organizationId' in params else None
    parent_org_id = params['parentOrganizationId'] if 'parentOrganizationId' in params else None

    if org_id is None or parent_org_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Organization Id and Parent Organization Id is required'
        )

    session = request.session
    client_id = session['client']

    services = request.services()
    try:
        orgStore = services['store.clients.organizations']
        result = orgStore.setParentOrg(client_id, org_id, parent_org_id)
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )
        
    raise exception.HTTPOk(
        detail='Client Organization assigned',
        body={'message': 'Client Organization assigned parent'}
    )