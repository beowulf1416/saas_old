import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception

from jsonschema.exceptions import ValidationError
import json


@view_config(
    route_name='api.hr.id.types',
    request_method='POST',
    renderer='json'
)
def api_hr_id_types(request):
    services = request.services()
    idStore = services['store.hr.idtypes']
    types = []
    try:
        result = idStore.all()
        types = [
            {
                'id': r[0],
                'name': r[1]
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
        detail=f'{len(types)} id types found',
        body={
            'types': types
        }
    )