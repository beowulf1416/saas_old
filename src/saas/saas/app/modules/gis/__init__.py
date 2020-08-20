import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service


def includeme(config):
    log.info('including: saas.app.modules.gis')

    services = get_service(None)
    modules = services['modules']

    modules['gis'] = {
        'navigators': [
            {
                'id': 'gis',
                'title': 'GIS',
                'help': 'Geographical Information System',
                'icon': '<span class="material-icons">map</span>',
                'template': 'saas.app.modules.gis:templates/navigator.html',
                'permission': 'user.authenticated'
            }
        ],
        'js': [
            {
                'type': 'module',
                'script': '/static/js/modules/gis/actions.js'
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/gis/gis-editor/gis-editor.js'
            }
        ]
    }