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
        # remove system principals
        if principals is not None:
            effective_principals = [x for x in principals if x not in [Everyone, Authenticated]]
            for p in effective_principals:
                if isinstance(p, dict):
                    client_id = p['client_id'] if 'client_id' in p else None
                    user_id = p['user_id'] if 'user_id' in p else None
                    result = self.userStore.userHasPermission(user_id, client_id, permission)
                    if (result):
                        return True

        return False

    def principals_allowed_by_permission(self, context, permission):
        log.debug('//todo AuthorizationPolicy::principals_allowed_by_permission()')
        return None