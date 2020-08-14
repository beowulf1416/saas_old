import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service

def includeme(config):
    log.info('including: saas.app.core.modules.global')

    services = get_service(None)

    modules = services['modules']
    modules['global'] = {
        'js': [
            {
                'script': 'https://cdnjs.cloudflare.com/ajax/libs/uuid/8.1.0/uuidv4.min.js',
                'async': True,
                'external': True
            }
        ]
    }