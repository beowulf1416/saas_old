import logging
log = logging.getLogger(__name__)

from zope.interface import implementer
from pyramid.interfaces import ISession, ISessionFactory

from saas.app.core.session.jwt.session_cookie import SessionCookie


@implementer(ISessionFactory)
class JWTSessionFactory(object):
    def __init__(self, secret, algorithm):
        self.secret = secret
        self.algorithm = algorithm

    def __call__(self, request):
        return SessionCookie(request)