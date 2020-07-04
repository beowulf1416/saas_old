import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service

def includeme(config):
    log.info('including: saas.app.modules.crm')

    config.include('saas.app.modules.crm.stores')
    config.include('saas.app.modules.crm.api')

    services = get_service(None)
    modules = services['modules']
    modules['crm'] = {
        'navigators': [
            {
                'id': 'crm',
                'title': 'CRM',
                'help': 'Customer Relations Management',
                'icon': '<span class="material-icons">contacts</span>',
                'template': 'saas.app.modules.crm:templates/module.html'
            }
        ],
        'js': [
            {
                'type': 'module',
                'script': '/static/js/modules/crm/actions.js'
            },
            {
                'type': 'module',
                'script': '/static/custom.elements/crm/organization-explorer/organization-explorer.js'
            }
        ]
    }