import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service


def includeme(config):
    log.info('including: saas.app.modules.common')

    config.include('saas.app.modules.common.stores')
    config.include('saas.app.modules.common.api')

    services = get_service(None)
    modules = services['modules']
    modules['common'] = {
        'js': [
            {
                'type': 'module',
                'script': '/static/custom-elements/currency-selector/currency-selector.js',
                'async': True
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/currency-selector/currency-selector-view.js',
                'async': True
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/country-selector/country-selector.js',
                'async': True
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/country-selector/country-selector-view.js',
                'async': True
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/uom-selector/uom-selector.js',
                'async': True
            },
            {
                'type': 'module',
                'script': '/static/custom-elements/uom-selector/uom-selector-view.js',
                'async': True
            }
        ]
    }