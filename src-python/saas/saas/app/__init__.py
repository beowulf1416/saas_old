import logging
log = logging.getLogger(__name__)

from pyramid.session import SignedCookieSessionFactory
from saas.app.core.policies.authentication import AuthenticationPolicy
from saas.app.core.policies.authorization import AuthorizationPolicy


def includeme(config):
    config.include('saas.app.core')

    settings = config.get_settings()
    secret = settings['cookie.secret']
    log.info(secret)

    config.set_session_factory(SignedCookieSessionFactory(secret))
    config.set_authentication_policy(AuthenticationPolicy())
    config.set_authorization_policy(AuthorizationPolicy())