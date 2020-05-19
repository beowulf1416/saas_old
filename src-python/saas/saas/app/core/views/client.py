import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config


@view_config(
    route_name='client.list',
    renderer='saas.app:templates/client/list.html',
    request_method='GET'
)
def view_client_list(request):
    session = request.session
    email = session['email']

    services = request.services()
    userStore = services['store.user']
    user = userStore.userByEmail(email)
    user_id = user[0]
    clients = userStore.userClients(user_id)

    return {
        'clients': clients
    }

@view_config(
    route_name='client.select',
    renderer='saas.app:templates/client/select.html',
    request_method='GET'
)
def view_client_select(request):
    return {}