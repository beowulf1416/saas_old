import logging
log = logging.getLogger(__name__)

import json

import pyramid.httpexceptions as exception
from pyramid.view import view_config





@view_config(
    route_name='security.supported.signins',
    renderer='saas.app.core:templates/security/signin.html',
    request_method='GET'
)
def view_supported_signins(request):
    log.info('VIEW: security:view_supported_signins')

    google_credentials_file = request.registry.settings['google.credentials.file']
    client_id = ''
    with open(google_credentials_file, 'r') as f:
        data = json.loads(f.read())
        client_id = data['web']['client_id']

    if len(client_id) == 0:
        log.error('unable to parse google client id from {0}', google_credentials_file)
        raise exception.HTTPInternalServerError(
            detail = 'Unable to generate google oauth url'
        )

    google_scopes = '%20'.join([
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'openid',
        'profile',
        'email'
        ])

    google_oauth_url = (
        'https://accounts.google.com/o/oauth2/auth?'
        'client_id={client_id}'
        '&redirect_uri={redirect_url}'
        '&response_type=code'
        '&scope={scopes}'
    ).format(
        client_id = client_id,
        redirect_url = request.route_url('security.oauth.redirect.google'),
        # 'http://localhost:6543/security/signin',
        scopes = google_scopes
    )
    return {
        'google_oauth_url': google_oauth_url
    }


@view_config(
    route_name='security.oauth.redirect.google',
    request_method='GET',
    request_param='code'
)
def view_google_oauth_redirect(request):
    log.debug('VIEW: security:view_google_oauth_redirect')
    code = request.params['code']
    log.debug(code)
    return {}