import logging
log = logging.getLogger(__name__)


def includeme(config):
    config.add_route(
        'api.client.get',
        '/api/client/get'
    )

    config.add_route(
        'api.client.join',
        '/api/client/join'
    )