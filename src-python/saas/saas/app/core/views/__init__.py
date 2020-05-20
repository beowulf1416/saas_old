import logging
log = logging.getLogger(__name__)


def includeme(config):
    config.add_route(
        'home',
        '/'
    )

    config.add_route(
        'security.signout',
        '/security/signout'
    )

    config.add_route(
        'security.signin',
        '/security/signin'
    )

    config.add_route(
        'security.oauth.redirect.google',
        '/security/signin/google/oauth/redirect'
    )

    config.add_route(
        'client.select',
        '/client/select/{client_id}'
    )

    config.add_route(
        'client.list',
        '/client/list'
    )

    config.add_route(
        'user.dashboard',
        '/dashboard'
    )


def view_not_found(request):
    log.debug("view not found")
    return {}

def view_forbidden(request):
    log.debug("view forbidden")
    return {}