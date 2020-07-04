import logging
log = logging.getLogger(__name__)


def includeme(config):
    config.add_route(
        'api.client.get',
        '/api/client/get'
    )