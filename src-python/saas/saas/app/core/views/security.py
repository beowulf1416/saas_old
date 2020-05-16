import logging

from pyramid.view import view_config

log = logging.getLogger(__name__)


@view_config(
    route_name='security.supported.signins',
    renderer='saas.app.core:templates/security/signin.html'
)
def view_supported_signins(request):
    log.info('VIEW: security:view_supported_signins')
    return {}