import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: saas.app.modules.hr.api')

    config.add_route(
        'api.hr.members.filter',
        '/api/hr/members/filter'
    )

    config.add_route(
        'api.hr.members.save',
        '/api/hr/members/save'
    )