import logging

log = logging.getLogger(__name__)

import json
from pyramid.renderers import JSON
import datetime


def includeme(config):
    log.info('including: saas.app.core')

    json_renderer = JSON()
    def datetime_adapter(obj, request):
        return obj.isoformat()
    json_renderer.add_adapter(datetime.datetime, datetime_adapter)
    config.add_renderer('json', json_renderer)

    config.include('saas.app.core.services')
    config.include('saas.app.core.stores')
    config.include('saas.app.core.views')

    config.include('saas.app.modules.common')
    config.include('saas.app.modules.admin')