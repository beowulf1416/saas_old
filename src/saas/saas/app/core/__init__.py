import logging

log = logging.getLogger(__name__)

import json
from pyramid.renderers import JSON
import datetime
import decimal


def includeme(config):
    log.info('including: saas.app.core')

    json_renderer = JSON()
    def datetime_adapter(obj, request):
        return obj.isoformat()
    json_renderer.add_adapter(datetime.datetime, datetime_adapter)

    def time_adapter(obj, request):
        return obj.isoformat()
    json_renderer.add_adapter(datetime.time, time_adapter)

    def decimal_adapter(obj, request):
        return str(obj)
    json_renderer.add_adapter(decimal.Decimal, decimal_adapter)

    config.add_renderer('json', json_renderer)

    config.include('saas.app.core.services')
    config.include('saas.app.core.stores')
    config.include('saas.app.core.views')
    config.include('saas.app.core.views.api')

    config.include('saas.app.core.modules.global')
    config.include('saas.app.core.modules.user')

    config.include('saas.app.modules.common')
    config.include('saas.app.modules.admin')