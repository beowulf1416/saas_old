import logging
log = logging.getLogger(__name__)

from zope.interface import implementer
from pyramid.interfaces import IAuthenticationPolicy

@implementer(IAuthenticationPolicy)
class AuthenticationPolicy(object):
    def authenticated_userid(self, request):
        log.debug('//todo AuthenticationPolicy::authenticated_userid()')
        return None

    def unauthenticated_userid(self, request):
        log.debug('//todo AuthenticationPolicy::unauthenticated_userid()')
        return None

    def effective_principals(self, request):
        log.debug('//todo AuthenticationPolicy::effective_principals()')
        return None

    def remember(self, request, userid, **kw):
        log.debug('//todo AuthenticationPolicy::remember()')
        try: 
            session = request.session
            session['email'] = userid
        except Exception as e:
            log.error(e)
            raise e
        return None

    def forget(self, request):
        log.debug('//todo AuthenticationPolicy::forget()')
        return None