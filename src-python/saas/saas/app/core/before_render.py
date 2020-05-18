import logging
log = logging.getLogger(__name__)

from pyramid.events import subscriber
from pyramid.events import BeforeRender

@subscriber(BeforeRender)
def add_renderer_globals(event):
    request = event['request']
    session = request.session

    if 'email' in session:
        event['email'] = session['email']

    log.debug(event)
