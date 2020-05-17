import logging
log = logging.getLogger(__name__)

from zope.interface import implementer
from pyramid.interfaces import IAuthorizationPolicy


@implementer(IAuthorizationPolicy)
class AuthorizationPolicy(object):
    def permits(self, context, principals, permission):
        log.debug('//todo AuthorizationPolicy::permits()')
        return None

    def principals_allowed_by_permission(self, context, permission):
        log.debug('//todo AuthorizationPolicy::principals_allowed_by_permission()')
        return None