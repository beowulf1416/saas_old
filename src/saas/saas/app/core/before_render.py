import logging
log = logging.getLogger(__name__)

from pyramid.events import subscriber
from pyramid.events import BeforeRender

@subscriber(BeforeRender)
def add_renderer_globals(event):
    request = event['request']

    current_route_path = request.path
    event['current_path'] = current_route_path

    services = request.services()
    session = request.session

    if 'email' in session:
        event['email'] = session['email']

    if 'client' in session:
        client_id = session['client']
        event['client_id'] = client_id
        
        clientStore = services['store.client']
        try:
            client = clientStore.getClient(client_id)
            event['client_name'] = client[2]
        except Exception as e:
            log.error(e)