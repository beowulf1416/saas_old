import logging
log = logging.getLogger(__name__)

import json

from pyramid.view import notfound_view_config, forbidden_view_config, exception_view_config
import pyramid.httpexceptions as exception


@notfound_view_config(
    accept='text/html',
    renderer='saas.app:templates/errors/404.html'
)
def view_not_found_default(request):
    exception = request.exception
    log.error(exception)
    request.response.status_int = exception.code
    return {}

@notfound_view_config(
    accept='application/json',
    renderer='json'
)
def view_not_found_json(request):
    exception = request.exception
    log.error(exception)
    request.response.status_int = exception.code
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
    exception = request.exception
    log.error(exception)
    request.response.status_int = exception.code
    return {}


@forbidden_view_config(
    accept='application/json',
    renderer='json'
)
def view_forbidden_json(request):
    exception = request.exception
    log.error(exception)
    request.response.status_int = exception.code
    return {
        'status': 'error',
        'message': 'forbidden',
        'json': {
            'error': 'forbidden'
        }
    }


@exception_view_config(
    exception.HTTPInternalServerError,
    accept='text/html',
    renderer='saas.app:templates/errors/error.html'
)
def view_exception_html_error(request):
    exception = request.exception
    log.error(exception)
    request.response.status_int = exception.code
    return {
        'code': exception.code,
        'code_title': exception.title,
        'detail': exception.detail,
        'explanation': exception.explanation,
        'sidebars': False
    }

@exception_view_config(
    exception.HTTPInternalServerError,
    accept='application/json',
    renderer='json',
)
@exception_view_config(
    exception.HTTPBadRequest,
    accept='application/json',
    renderer='json',
)
def view_exception_json_error(request):
    exception = request.exception
    log.error(exception)
    request.response.status_int = exception.code
    return {
        'status': 'error',
        'message': exception.detail,
        'json': {
            'code': exception.code,
            'title': exception.title,
            'explanation': exception.explanation
        }
    }


@exception_view_config(
    exception.HTTPOk,
    accept='application/json',
    renderer='json',
)
def view_exception_json_success(request):
    exception = request.exception
    return {
        'status': 'success',
        'message': exception.detail,
        'json': exception.body
    }