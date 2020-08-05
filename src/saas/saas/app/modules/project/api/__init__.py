import logging
log = logging.getLogger(__name__)


def includeme(config):
    log.info('including: saas.app.modules.project.api')

    # projects
    config.add_route(
        'api.work.projects.add',
        '/api/work/projects/add'
    )

    config.add_route(
        'api.work.projects.update',
        '/api/work/projects/update'
    )

    config.add_route(
        'api.work.projects.get',
        '/api/work/projects/get'
    )