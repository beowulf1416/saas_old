import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: saas.app.modules.clients.views')

    config.add_route(
        'clients.home',
        '/client'
    )

    config.add_route(
        'clients.organizations',
        '/organizations'
    )
