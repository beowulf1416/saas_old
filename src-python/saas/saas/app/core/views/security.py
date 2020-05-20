import logging
log = logging.getLogger(__name__)

import json

import pyramid.httpexceptions as exception
from pyramid.view import view_config


@view_config(
    route_name='security.signout',
    request_method='GET',
    renderer='saas.app.core:templates/security/signout.html'
)
def view_signout(request):
    session = request.session
    session.invalidate()
    return {}

@view_config(
    route_name='security.signin',
    renderer='saas.app.core:templates/security/signin.html',
    request_method='GET'
)
def view_supported_signins(request):
    log.info('VIEW: security:view_supported_signins')

    destination = request.params['destination'] if 'destination' in request.params else ''

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
        '&state={state}'
    ).format(
        client_id = client_id,
        redirect_url = request.route_url('security.oauth.redirect.google'),
        scopes = google_scopes,
        state = 'test_state'
    )

    if len(destination) > 0:
        google_oauth_url = '{0}&dest={1}'.format(google_oauth_url, destination)

    return {
        'google_oauth_url': google_oauth_url
    }


