import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: saas.app.modules.crm.api')

    config.add_route(
        'api.crm.organizations.save',
        '/api/crm/organizations/save'
    )