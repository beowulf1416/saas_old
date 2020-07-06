import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: saas.app.modules.crm.api')

    # organizations
    config.add_route(
        'api.crm.organizations.save',
        '/api/crm/organizations/save'
    )

    config.add_route(
        'api.crm.organizations.filter',
        '/api/crm/organizations/filter'
    )

    config.add_route(
        'api.crm.organizations.get',
        '/api/crm/organizations/get'
    )