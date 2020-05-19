import logging
log = logging.getLogger(__name__)

import json

from saas.app.core.session.jwt.session_factory import SessionFactory
from saas.app.core.policies.authentication import AuthenticationPolicy
from saas.app.core.policies.authorization import AuthorizationPolicy
from saas.app.core.services import get_service


def includeme(config):
    config.include('saas.app.core')

    settings = config.get_settings()

    config_location = settings['app.config']
    with open('{0}/databases.json'.format(config_location), 'r') as f:
        data = json.loads(f.read())
        databases = data['databases']
        for db in databases:
            dbtype = db['type']

    cookie_name = settings['cookie.name']
    cookie_secret = settings['cookie.secret']
    cookie_max_age = settings['cookie.max_age']
    cookie_timeout = settings['cookie.timeout']

    config.set_session_factory(SessionFactory(
        cookie_name,
        cookie_secret, 
        cookie_max_age,
        float(cookie_timeout)
    ))

    services = get_service(None)
    userStore = services['store.user']
    config.set_authentication_policy(AuthenticationPolicy(userStore))
    config.set_authorization_policy(AuthorizationPolicy(userStore))

    config.include('saas.app.modules.admin')