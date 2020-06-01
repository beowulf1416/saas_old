import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: saas.app.modules.clients.views.api')

    config.add_route(
        'api.clients.organizations.add',
        '/api/clients/organizations/add'
    )