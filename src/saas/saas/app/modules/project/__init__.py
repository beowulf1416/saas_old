import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service


def includeme(config):
    log.info('including: saas.app.modules.project')

    config.include('saas.app.modules.project.stores')
    config.include('saas.app.modules.project.api')

    services = get_service(None)
    modules = services['modules']
    modules['project'] = {
        'navigators': [
            {
                'id': 'project',
                'title': 'Project Management',
                'help': 'Manage Projects',
                'icon': '<span class="material-icons">work</span>',
                'template': 'saas.app.modules.project:templates/module.html'
            }
        ],
        'views': [],
        'css': [],
        'js': [
            {
                'type': 'module',
                'script': '/static/js/modules/project/actions.js'
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/project/project-explorer/project-explorer.js',
                'async': True
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/project/project-editor/project-editor.js',
                'async': True
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/project/task/task-editor/task-editor.js',
                'async': True
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/gantt-chart/gantt-chart.js',
                'async': True
            },
        ]
    }
