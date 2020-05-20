import logging
log = logging.getLogger(__name__)

import json

from pyramid.view import notfound_view_config, forbidden_view_config, exception_view_config


@notfound_view_config(
    accept='text/html',
    renderer='saas.app:templates/errors/404.html'
)
def view_not_found_default(request):
    request.response.status_int = 404
    return {}

@notfound_view_config(
    accept='application/json',
    renderer='json'
)
def view_not_found_json(request):
    request.response.status_int = 404
    return {
        'status': 'error',
        'message': 'endpoint not found',
        'json': {
            'error': 'endpoint not found'
        }
    }

@forbidden_view_config(
    accept='text/html',
    renderer='saas.app:templates/errors/403.html'
)
def view_forbidden_default(request):
    request.response.status_int = 403
    return {}


@forbidden_view_config(
    accept='application/json',
    renderer='json'
)
def view_forbidden_json(request):
    request.response.status_int = 403
    return {
        'status': 'error',
        'message': 'forbidden',
        'json': {
            'error': 'forbidden'
        }
    }