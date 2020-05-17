# ref: https://docs.pylonsproject.org/projects/pyramid/en/latest/_modules/pyramid/session.html#BaseCookieSessionFactory
import logging
log = logging.getLogger(__name__)

from zope.interface import implementer
from pyramid.interfaces import ISession, ISessionFactory
from pyramid.session import manage_accessed, manage_changed

import time
import json


@implementer(ISessionFactory)
def SessionFactory(
    secret,
    max_age,
    timeout,
    algorithm = 'HMAC256',
    cookie_name='session'
):
    @implementer(ISession)
    class SessionCookie(dict):

        _cookie_name = 'session'
        # dirty flag
        _dirty = False

        def __init__(self, request):
            log.debug('SessionCookie::__init__()')
            self.request = request

            # flags
            new = True # assume that this is a new session

            # time base flags
            now = time.time()
            created = renewed = now

            cookie_value = request.cookies.get(self._cookie_name)
            
            state = {}
            value = None

            if cookie_value is not None:
                try:
                    value = json.loads(cookie_value)
                except ValueError as e:
                    log.error(e)
                    value = None

            log.debug('value', value)
            if value is not None:
                try:
                    renewed_value, created_value, state_value = value
                    renewed = float(renewed_value)
                    created_value = float(created_value)
                    state = state_value
                    new = False
                except (TypeError, ValueError) as e:
                    log.error(e)
                    state = {}

            # check if session timed out
            if now - renewed > timeout:
                # session has timed out, expire the session
                state = {}

            self.created = created
            self.accessed = created
            self.renewed = renewed
            self.new = new
            dict.__init__(self, state)


        # actually set the cookie
        def _set_cookie(self, response):
            # do not set cookie on exception
            if self.request.exception is not None:
                return False

            cookie_value = json.dumps({
                'iat': self.created,
                'state': dict(self)
            })
            if len(cookie_value > 4064):
                raise ValueError('Cookie value is too long to store (%s bytes)') % len(cookie_value)

            response.set_cookie(
                self._cookie_name,
                value = cookie_value,
                max_age = max_age,
                path = '/',
                # domain = 
                secure = True,
                httponly = True,
                samesite = 'Strict'
            )
            return True

        # ISession methods
        def changed(self):
            if not self._dirty:
                self._dirty = True

                def set_cookie_callback(request, response):
                    self._set_cookie(response)
                    self.request = None  # explicitly break cycle for gc

                self.request.add_response_callback(set_cookie_callback)

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