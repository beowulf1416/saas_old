import logging
log = logging.getLogger(__name__)

from saas.app.core.session.jwt.session_factory import SessionFactory
from saas.app.core.policies.authentication import AuthenticationPolicy
from saas.app.core.policies.authorization import AuthorizationPolicy


def includeme(config):
    config.include('saas.app.core')

    settings = config.get_settings()
    cookie_secret = settings['cookie.secret']
    cookie_max_age = settings['cookie.max_age']
    cookie_timeout = settings['cookie.timeout']

    config.set_session_factory(SessionFactory(
        cookie_secret, 
        cookie_max_age,
        cookie_timeout
    ))
    config.set_authentication_policy(AuthenticationPolicy())
    config.set_authorization_policy(AuthorizationPolicy())