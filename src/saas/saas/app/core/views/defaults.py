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
    modules = services['modules']

    # aggregate unique js
    scripts = {}
    elements = {}
    for m, module in modules.items():
        if 'elements' in module:
            for element in module['elements']:
                tag = element['tag'] if 'tag' in element else ''
                js = element['script'] if 'script' in element else ''
                if tag != '' and js != '':
                    elements[tag] = js
                    scripts[js] = {
                        'type': 'module',
                        'async': 'True',
                        'script': js
                    }
        if 'js' in module:
            for js in module['js']:
                if 'script' in js:
                    k = js['script']
                    scripts[k] = js
                else:
                    log.warning("module '%s' does not have 'script' key", m)

    # aggregate js that have external = true
    # and add to content-security-policy
    csp = {
        'scripts': []
    }
    for js, script in scripts.items():
        if 'external' in script:
            csp['scripts'].append(script['script'])

    return {
        'modules': modules,
        'elements': elements,
        'scripts': scripts,
        'csp': csp
    }


@view_config(
    route_name='user.dashboard',
    renderer='saas.app:templates/dashboard.html',
    request_method='GET',
    permission='user.authenticated'
)
def view_dashboard(request):
    return {}

@view_config(
    route_name='user.profile',
    renderer='saas.app:templates/profile.html',
    request_method='GET',
    permission='user.authenticated'
)
def view_profile(request):
    return {}