import logging
log = logging.getLogger(__name__)

import json

import pyramid.httpexceptions as exception
from pyramid.view import view_config, notfound_view_config, forbidden_view_config, exception_view_config
from pyramid.renderers import render


@view_config(
    route_name='home',
    renderer='saas.app:templates/default.html',
    request_method='GET'
)
def view_default(request):
    services = request.services()
    available = services['modules']

    modules = [
        {
            'module_name': k,
            'descriptor': v.getModuleDescriptor(),
            'template': v.getContent()['template'],
            'content': render(v.getContent()['template'], {}, request)
        }
        for (k,v) in available.items()
    ]

    return {
        'modules': modules
    }

@view_config(
    route_name='user.dashboard',
    renderer='saas.app:templates/dashboard.html',
    request_method='GET',
    permission='user.authenticated'
)
def view_dashboard(request):
    return {}