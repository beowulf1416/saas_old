import logging
log = logging.getLogger(__name__)


def includeme(config):
    config.add_notfound_view(
        view_not_found,
        renderer = 'saas.app:templates/errors/404.html'
    )

    config.add_forbidden_view(
        view_forbidden,
        renderer = 'saas.app:templates/errors/403.html'
    )

    config.add_route(
        'security.supported.signins',
        '/security/signin'
    )

    config.add_route(
        'security.oauth.redirect.google',
        '/security/signin/google/oauth/redirect'
    )

    config.add_route(
        'client.select',
        '/client/select'
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