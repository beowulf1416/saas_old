import logging
log = logging.getLogger(__name__)

from pyramid.events import subscriber
from pyramid.events import BeforeRender

@subscriber(BeforeRender)
def add_renderer_globals(event):
    request = event['request']
    services = request.services()
    session = request.session

    if 'email' in session:
        event['email'] = session['email']

    if 'client' in session:
        client_id = session['client']
        clientStore = services['store.client']
        client = clientStore.getClient(client_id)
        event['client_name'] = client[2]