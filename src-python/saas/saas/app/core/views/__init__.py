import logging

log = logging.getLogger(__name__)

def includeme(config):
    config.add_route(
        'security.supported.signins',
        '/security/signin'
    )

    config.add_route(
        'security.oauth.redirect.google',
        '/security/signin/google/oauth/redirect'
    )