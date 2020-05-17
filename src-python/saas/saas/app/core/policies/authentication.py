import logging
log = logging.getLogger(__name__)

from zope.interface import implementer
from pyramid.interfaces import IAuthenticationPolicy

@implementer(IAuthenticationPolicy)
class AuthenticationPolicy(object):
    def authenticated_userid(request):
        log.debug('//todo AuthenticationPolicy::authenticated_userid()')
        return None

    def unauthenticated_userid(request):
        log.debug('//todo AuthenticationPolicy::unauthenticated_userid()')
        return None

    def effective_principals(request):
        log.debug('//todo AuthenticationPolicy::effective_principals()')
        return None

    def remember(request, userid, **kw):
        log.debug('//todo AuthenticationPolicy::remember()')
        return None

    def forget(request):
        log.debug('//todo AuthenticationPolicy::forget()')
        return None