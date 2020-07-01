import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('including: saas.app.modules.hr.api')

    # id types
    config.add_route(
        'api.hr.id.types',
        '/api/hr/id/types'
    )

    # shifts
    config.add_route(
        'api.hr.shifts.save',
        '/api/hr/shifts/save'
    )

    config.add_route(
        'api.hr.shifts.all',
        '/api/hr/shifts/all'
    )

    config.add_route(
        'api.hr.shifts.filter',
        '/api/hr/shifts/filter'
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

    # time entries
    config.add_route(
        'api.hr.time.entries.save',
        '/api/hr/time/entries/save'
    )