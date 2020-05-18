import logging
log = logging.getLogger(__name__)

import json

from saas.app.core.session.jwt.session_factory import SessionFactory
from saas.app.core.policies.authentication import AuthenticationPolicy
from saas.app.core.policies.authorization import AuthorizationPolicy


def includeme(config):
    config.include('saas.app.core')

    settings = config.get_settings()

    config_location = settings['app.config']
    with open('{0}/databases.json'.format(config_location), 'r') as f:
        data = json.loads(f.read())
        databases = data['databases']
        for db in databases:
            dbtype = db['type']



    cookie_secret = settings['cookie.secret']
    cookie_max_age = settings['cookie.max_age']
    cookie_timeout = settings['cookie.timeout']

    config.set_session_factory(SessionFactory(
        cookie_secret, 
        cookie_max_age,
        float(cookie_timeout)
    ))
    config.set_authentication_policy(AuthenticationPolicy())
    config.set_authorization_policy(AuthorizationPolicy())