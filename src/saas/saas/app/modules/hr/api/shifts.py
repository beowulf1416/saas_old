import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception

import json


@view_config(
    route_name='api.hr.shifts.save',
    request_method='POST',
    renderer='json'
)
def api_hr_shifts_save(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    shift_id = params['shiftId'] if 'shiftId' in params else None
    name = params['name'] if 'name' in params else None
    start = params['start'] if 'start' in params else None
    end = params['end'] if 'end' in params else None

    if client_id is None or shift_id is None or name is None or start is None or end is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id, shift id, name, start and end times are required'
        )

    services = request.services()
    store = services['store.hr.shifts']
    try:
        store.save(client_id, shift_id, name, start, end)
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='shift record saved',
        body={
            'message': 'shift record saved'
        }
    )

@view_config(
    route_name='api.hr.shifts.all',
    request_method='POST',
    renderer='json'
)
def api_hr_shifts_all(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None

    if client_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id is required'
        )

    services = request.services()
    store = services['store.hr.shifts']
    shifts = []
    try:
        result = store.all(client_id)
        shifts = [
            {
                'id': r[0],
                'active': r[1],
                'created': r[2],
                'name': r[3],
                'start': r[4],
                'end': r[5]
            }
            for r in result
        ]
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail=f'{len(result)} shifts found',
        body={
            'shifts': shifts
        }
    )

@view_config(
    route_name='api.hr.shifts.filter',
    request_method='POST',
    renderer='json'
)
def api_hr_shifts_filter(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    filter = params['filter'] if 'filter' in params else None

    if client_id is None or filter is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id and filter is required'
        )

    services = request.services()
    store = services['store.hr.shifts']
    shifts = []
    try:
        result = store.filter(client_id, filter)
        shifts = [
            {
                'id': r[0],
                'active': r[1],
                'created': r[2],
                'name': r[3],
                'start': r[4],
                'end': r[5]
            }
            for r in result
        ]
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail=f'{len(result)} shifts found',
        body={
            'shifts': shifts
        }
    )