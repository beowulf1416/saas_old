import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: saas.app.modules.hr.api')

    # id types
    config.add_route(
        'api.hr.id.types',
        '/api/hr/id/types'
    )

    # members
    config.add_route(
        'api.hr.members.filter',
        '/api/hr/members/filter'
    )

    config.add_route(
        'api.hr.members.save',
        '/api/hr/members/save'
    )

    config.add_route(
        'api.hr.members.get',
        '/api/hr/members/get'
    )