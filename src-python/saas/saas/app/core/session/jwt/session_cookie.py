import logging
log = logging.getLogger(__name__)

from zope.interface import implementer
from pyramid.interfaces import ISession


@implementer(ISession)
class SessionCookie(dict):
    def __init__(self, request):
        self.request = request