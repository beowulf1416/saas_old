import logging
log = logging.getLogger(__name__)

import json

import pyramid.httpexceptions as exception
from pyramid.view import view_config


@view_config(
    route_name='home',
    renderer='saas.app:templates/default.html',
    request_method='GET'
)
def view_default(request):
    return {}