import logging
log = logging.getLogger(__name__)

from pyramid.session import SignedCookieSessionFactory


def includeme(config):
    config.include('saas.app.core')

    settings = config.get_settings()
    secret = settings['cookie.secret']
    log.info(secret)

    config.set_session_factory(SignedCookieSessionFactory(secret))
    