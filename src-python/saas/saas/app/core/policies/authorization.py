import logging
log = logging.getLogger(__name__)

from zope.interface import implementer
from pyramid.interfaces import IAuthorizationPolicy
from pyramid.security import Everyone, Authenticated


@implementer(IAuthorizationPolicy)
class AuthorizationPolicy(object):
    def __init__(self, userStore):
        self.userStore = userStore

    def permits(self, context, principals, permission):
        log.debug('//todo AuthorizationPolicy::permits()')
        log.debug(context)
        log.debug(principals)
        log.debug(permission)

        effective_principals = [x for x in principals if x not in [Everyone, Authenticated]]
        log.debug(effective_principals)

        return None

    def principals_allowed_by_permission(self, context, permission):
        log.debug('//todo AuthorizationPolicy::principals_allowed_by_permission()')
        return None