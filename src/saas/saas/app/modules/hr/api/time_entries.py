import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception

import json
from jsonschema import validate
from jsonschema.exceptions import ValidationError


@view_config(
    route_name='api.hr.time.entries.save',
    request_method='POST',
    renderer='json'
)
def api_hr_time_entries_save(request):
    params = request.json_body

    services = request.services()
    validator = services['validator.json']
    timeEntries = services['store.hr.time.entries']
    try:
        validator.validate(
            instance = params,
            schema_file = 'hr/time-entries.json'
        )
        
        client_id = params['clientId'] if 'clientId' in params else None
        member_id = params['memberId'] if 'memberId' in params else None

        timeEntries.save(client_id, member_id, params)
    except ValidationError as e:
        log.error(e)
        raise exception.HTTPBadRequest(
            detail=e.message,
            explanation='Incorrect parameters'
        )
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Time Entries saved',
        body={
            'message': 'Time Entries saved'
        }
    )