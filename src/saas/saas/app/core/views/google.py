import logging
log = logging.getLogger(__name__)

import jwt
import json
import base64
from urllib.parse import urlencode

import pyramid.httpexceptions as exception
from pyramid.view import view_config
from pyramid.security import remember

import httplib2

def parse_credentials_file(file):
    data = {}
    with open(file, 'r') as f:
        data = json.loads(f.read())
    return data


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

    credentials_file = request.registry.settings['google.credentials.file']

    credentials = parse_credentials_file(credentials_file)
    client_id = credentials['web']['client_id']
    client_secret = credentials['web']['client_secret']
    token_url = credentials['web']['token_uri']
    
    # ref: https://developers.google.com/identity/protocols/oauth2/openid-connect#exchangecode
    # exchange code for access token
    http = httplib2.Http()
    try:
        (response, content) = http.request(
            token_url,
            'POST',
            headers = {
                'content-type': 'application/x-www-form-urlencoded',
                'cache-control': 'no-cache'
            },
            body = urlencode({
                'code': code,
                'client_id': client_id,
                'client_secret': client_secret,
                'redirect_uri': request.route_url('security.oauth.redirect.google'),
                'grant_type': 'authorization_code'
            })
        )

        if response['status'] == '200':
            content = json.loads(content)

            access_token = content['access_token']
            expires = content['expires_in']
            token_type = content['token_type']
            id_token = content['id_token']

            decoded = parse_id_token(id_token)
            sub = decoded['sub']
            email = decoded['email']
            name = decoded['name']
            given_name = decoded['given_name']
            family_name = decoded['family_name']
            locale = decoded['locale']
            issued_at = decoded['iat']
            expires = decoded['exp']

            services = request.services()
            userStore = services['store.user']
            clientStore = services['store.client']

            # check if email is already registered
            if not userStore.emailExists(email):
                userStore.userAdd(email, name)

            user = userStore.userByEmail(email)
            client = clientStore.getDefaultClient()
            client_id = client[0]
            remember(request, email, client=client_id)

            raise exception.HTTPFound(request.route_url('home'))
        else:
            raise exception.HTTPInternalServerError(
                detail = 'OAUTH request failed'
            )
    except httplib2.ServerNotFoundError as e:
        log.error(e)
        raise exception.HttpInternalServerError(
            message = e.message,
            detail = e.message
        )

# https://stackoverflow.com/questions/16923931/python-google-ouath-authentication-decode-and-verify-id-token
def parse_id_token(token: str) -> dict:
    parts = token.split(".")
    if len(parts) != 3:
        raise Exception("Incorrect id token format")

    payload = parts[1]
    padded = payload + '=' * (4 - len(payload) % 4)
    decoded = base64.b64decode(padded)
    return json.loads(decoded)