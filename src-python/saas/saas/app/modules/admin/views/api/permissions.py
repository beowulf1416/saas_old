import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception

import json


@view_config(
    route_name='api.clients.permissions.all',
    request_method='POST',
    accept='application/json',
    permission='admin.clients'
)
def view_permissions_all(request):
    permissions = []
    services = request.services()
    try:
        permissionsStore = services['store.admin.permissions']
        result = permissionsStore.getAll()
        permissions = [
            { 'id': c[0], 'active': c[1], 'name': c[2] } 
            for c in result
        ]
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )
    raise exception.HTTPOk(
        detail='{0} permissions'.format(len(permissions)),
        body={ 'permissions': permissions }
    )
