import logging
log = logging.getLogger(__name__)

import json

import pyramid.httpexceptions as exception
from pyramid.view import view_config


@view_config(
    route_name='security.oauth.redirect.google',
    request_method='GET',
    renderer='saas.app:templates/error.html'
)
def view_google_oauth_redirect(request):
    log.debug('VIEW: security:view_google_oauth_redirect')
    code = request.params['code'] if 'code' in request.params else ''
    error = request.params['error'] if 'error' in request.params else ''

    if code == '':
        log.error('Code is empty')
        raise exception.HttpInternalServerError(
            detail = 'Code is empty'
        )

    if error != '':
        log.error('Error result in redirect: {0}', error)
        raise exception.HttpInternalServerError(
            detail = error
        )

    

    return {
        'error': error
    }