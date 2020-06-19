import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception

from jsonschema.exceptions import ValidationError
import json


@view_config(
    route_name='api.hr.members.save',
    request_method='POST',
    renderer='json'
)
def api_hr_members_filter(request):
    params = request.json_body
    return {}