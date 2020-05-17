import logging
log = logging.getLogger(__name__)

from zope.interface import implementer
from pyramid.interfaces import IAuthorizationPolicy


@implementer(IAuthorizationPolicy)
class AuthorizationPolicy(object):
    def permits(context, principals, permission):
        log.debug('AuthorizationPolicy::permits()')
        return None

    def principals_allowed_by_permission(context, permission):
        log.debug('AuthorizationPolicy::principals_allowed_by_permission()')
        return None