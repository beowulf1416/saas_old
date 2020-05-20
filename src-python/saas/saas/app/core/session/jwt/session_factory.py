# ref: https://docs.pylonsproject.org/projects/pyramid/en/latest/_modules/pyramid/session.html#BaseCookieSessionFactory
import logging
log = logging.getLogger(__name__)

from zope.interface import implementer
from pyramid.interfaces import ISession, ISessionFactory
from pyramid.session import manage_accessed, manage_changed
import pyramid.httpexceptions as exception

import time
import json
import jwt


@implementer(ISessionFactory)
def SessionFactory(
    cookie_name: str,
    secret: str,
    max_age: float,
    timeout: float,
    algorithm: str = 'HMAC256'
):
    @implementer(ISession)
    class SessionCookie(dict):

        _cookie_name = 'session'
        _reissue_time = 0

        # dirty flag
        _dirty = False

        def __init__(self, request):
            # log.debug('SessionCookie::__init__()')
            self._request = request

            # flags
            new = True # assume that this is a new session

            # time base flags
            now = time.time()
            created = renewed = accessed = now

            cookie_value = self._request.cookies.get(self._cookie_name)
            
            state = {}
            value = None

            if cookie_value is not None:
                try:
                    jwt_key = self._request.registry.settings['jwt.secret']
                    value = jwt.decode(
                        cookie_value,
                        key=jwt_key,
                        algorithms=['HS256'],
                        verify=True
                    )
                except ValueError as e:
                    log.error(e)
                    value = None
            
            if value is not None:
                try:
                    created = value['iat'] if 'iat' in value else now
                    renewed = now
                    accessed = value['updated_at'] if 'updated_at' in value else now

                    new = False
                    state = value
                except (TypeError, ValueError) as e:
                    log.error(e)
                    state = {}

            # check if session timed out
            if now - renewed > timeout:
                # session has timed out, expire the session
                log.debug('session expired')
                state = {}

            self.created = created
            self.accessed = accessed
            self.renewed = renewed
            self.new = new
            dict.__init__(self, state)


        # actually set the cookie
        def _set_cookie(self, response):
            # do not set cookie on exception
            if self._request.exception is not None:
                if not isinstance(self._request.exception, exception.HTTPFound):
                    return False

            jwt_key = self._request.registry.settings['jwt.secret']

            copy = dict(self)
            copy['iat'] = self.created
            copy['updated_at'] = self.renewed

            cookie_value = jwt.encode(
                copy,
                key=jwt_key,
                algorithm='HS256'
            )

            if len(cookie_value) > 4064:
                raise ValueError('Cookie value is too long to store (%s bytes)') % len(cookie_value)

            response.set_cookie(
                self._cookie_name,
                value = cookie_value,
                max_age = max_age,
                path = '/',
                # domain = 
                secure = False, # set to true when using https
                httponly = True,
                # ref: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
                # samesite = 'Strict'
                samesite = 'Lax'
            )
            return True

        # ISession methods
        def changed(self):
            if not self._dirty:
                self._dirty = True

                def set_cookie_callback(request, response):
                    self._set_cookie(response)
                    self._request = None  # explicitly break cycle for gc

                self._request.add_response_callback(set_cookie_callback)

        def invalidate(self):
            self.clear()
            def set_cookie_clear_callback(request, response):
                response.set_cookie(
                    self._cookie_name,
                    value = '',
                    max_age = 0,
                    path = '/',
                    secure = False, # set to true when using https
                    httponly = True,
                    # ref: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
                    # samesite = 'Strict'
                    samesite = 'Lax'
                )
                self._request = None
                return True
            self._request.add_response_callback(set_cookie_clear_callback)


        # non-modifying dictionary methods
        get = manage_accessed(dict.get)
        __getitem__ = manage_accessed(dict.__getitem__)
        items = manage_accessed(dict.items)
        values = manage_accessed(dict.values)
        keys = manage_accessed(dict.keys)
        __contains__ = manage_accessed(dict.__contains__)
        __len__ = manage_accessed(dict.__len__)
        __iter__ = manage_accessed(dict.__iter__)

        # modifying dictionary methods
        clear = manage_changed(dict.clear)
        update = manage_changed(dict.update)
        setdefault = manage_changed(dict.setdefault)
        pop = manage_changed(dict.pop)
        popitem = manage_changed(dict.popitem)
        __setitem__ = manage_changed(dict.__setitem__)
        __delitem__ = manage_changed(dict.__delitem__)

    
    return SessionCookie