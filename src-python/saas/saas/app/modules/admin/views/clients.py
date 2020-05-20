import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config

import pyramid.httpexceptions as exception


@view_config(
    route_name='admin.clients',
    request_method='GET',
    renderer='saas.app.modules.admin:templates/clients/default.html',
    permission='admin.clients'
)
def view_clients_default(request):
    log.debug('view: view_clients_default')
    return {}

@view_config(
    route_name='admin.clients.list',
    request_method='GET',
    renderer='saas.app.modules.admin:templates/clients/list.html',
    permission='admin.clients'
)
def view_clients_list(request):
    return {}


@view_config(
    route_name='admin.clients.add',
    request_method='GET',
    renderer='saas.app.modules.admin:templates/clients/add.html',
    permission='admin.clients'
)
def view_clients_add(request):
    return {}

@view_config(
    route_name='admin.clients.client',
    request_method='GET',
    renderer='saas.app.modules.admin:templates/clients/client.html',
    permission='admin.clients'
)
def view_clients_client(request):
    client_url_name = request.matchdict['client']

    services = request.services()
    clientsStore = services['store.admin.clients']
    try:
        client = clientsStore.getByUrlName(client_url_name)
        json = {
            'id': client[0],
            'active': client[1],
            'name': client[2],
            'address': client[3],
            'url_name': client[4]
        }

        return {
            'client': json
        }
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail='An error occured while trying to retrieve client by url name',
            explanation='Unable to retrieve client by url name'
        )

@view_config(
    route_name='admin.clients.roles',
    request_method='GET',
    renderer='saas.app.modules.admin:templates/clients/roles.html',
    permission='admin.clients'
)
def view_client_roles(request):
    return {}

@view_config(
    route_name='admin.clients.users',
    request_method='GET',
    renderer='saas.app.modules.admin:templates/clients/users.html',
    permission='admin.clients'
)
def view_client_users(request):
    return {}