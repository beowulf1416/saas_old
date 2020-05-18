import logging
log = logging.getLogger(__name__)

from zope.interface import implementer
from pyramid.interfaces import IAuthenticationPolicy
from pyramid.security import Everyone, Authenticated

@implementer(IAuthenticationPolicy)
class AuthenticationPolicy(object):
    def authenticated_userid(self, request):
        log.debug('//todo AuthenticationPolicy::authenticated_userid()')
        session = request.session
        email = session['email'] if 'email' in session else None
        # log.debug(email)
        return email

    def unauthenticated_userid(self, request):
        log.debug('//todo AuthenticationPolicy::unauthenticated_userid()')
        session = request.session
        email = session['email'] if 'email' in session else None
        # log.debug(email)
        return email

    def effective_principals(self, request):
        log.debug('//todo AuthenticationPolicy::effective_principals()')
        session = request.session
        email = session['email'] if 'email' in session else None
        # log.debug(email)
        return [Everyone, Authenticated, email]

    def remember(self, request, userid, **kw):
        log.debug('//todo AuthenticationPolicy::remember()')
        try: 
            session = request.session
            session['email'] = userid
            for k, v in kw.items():
                if k != 'email':
                    session[k] = v
        except Exception as e:
            log.error(e)
            raise e
        return None

    def forget(self, request):
        log.debug('//todo AuthenticationPolicy::forget()')
        return None