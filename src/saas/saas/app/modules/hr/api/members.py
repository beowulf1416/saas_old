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
def api_hr_members_save(request):
    params = request.json_body

    services = request.services()
    validator = services['validator.json']
    membersStore = services['store.hr.members']

    try:
        validator.validate(
            instance = params,
            schema_file = '/hr/country/member.json'
        )
        membersStore.save(params)
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
        detail='Member record created',
        body={
            'message': 'Member record created'
        }
    )


@view_config(
    route_name='api.hr.members.filter',
    request_method='POST',
    renderer='json'
)
def api_members_filter(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    filter = params['filter'] if 'filter' in params else None

    if client_id is None or filter is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id and filter is required'
        )

    services = request.services()
    membersStore = services['store.hr.members']
    members = []
    try:
        result = membersStore.filter(client_id, filter)
        members = [
            {
                'id': r[0],
                'firstName': r[1],
                'middleName': r[2],
                'lastName': r[3],
                'prefix': r[4],
                'suffix': r[5]
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
        detail=f'{len(members)} members found',
        body={
            'members': members
        }
    )