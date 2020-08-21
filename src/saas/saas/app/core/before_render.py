import logging
log = logging.getLogger(__name__)

from pyramid.events import subscriber
from pyramid.events import BeforeRender

@subscriber(BeforeRender)
def add_renderer_globals(event):
    request = event['request']

    current_route_path = request.path
    event['current_path'] = current_route_path

    session = request.session
    services = request.services()
    user_store = services['store.user']

    permissions = []
    clients = []
    client_id = None
    user_id = None

    if 'email' in session:
        event['email'] = email = session['email']
        user = user_store.userByEmail(email)
        user_id = user[0]
        results = user_store.userClients(user_id)
        clients = [
            {
                'id': r[0],
                'name': r[2]
            }
            for r in results
        ]

    if 'client' in session:
        client_id = session['client']
        event['client_id'] = client_id
        
        clientStore = services['store.client']
        try:
            client = clientStore.getClient(client_id)
            event['client_name'] = client[2]
        except Exception as e:
            log.error(e)

    if all([client_id, user_id]):
        permissions = user_store.permissions(client_id, user_id)

    event['clients'] = clients
    event['permissions'] = permissions