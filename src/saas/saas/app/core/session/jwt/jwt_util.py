import logging
log = logging.getLogger(__name__)

import jwt


class JWTUtil:

    def __init__(secret, algorithm):
        log.debug('JWTUtil::__init__')
        self.secret = secret
        self.algorithm = algorithm

    def encode(self, payload):
        return jwt.encode(payload, self.secret, self.algorithm)

    def decode(self, encoded):
        return jwt.decode(encoded, self.secret, self.algorithm)