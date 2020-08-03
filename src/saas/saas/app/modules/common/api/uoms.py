import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception


@view_config(
    route_name='api.common.uom.filter',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def api_common_uom_filter(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    dimension = params['dimension'] if 'dimension' in params else None
    filter = params['filter'] if 'filter' in params else None

    if client_id is None or dimension is None or filter is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id, dimension and filter is required'
        )

    services = request.services()
    store = services['stores.common.uoms']
    uoms = []
    try:
        result = []
        if filter is None:
            result = store.all()
        else:
            result = store.filter(
                client_id,
                dimension,
                filter
            )

        uoms = [
            {
                'id': r[0],
                'name': r[1],
                'symbol': r[2]
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
        detail=f'{len(uoms)} units found',
        body={
            'uoms': uoms
        }
    )

@view_config(
    route_name='api.common.uom.get',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def api_common_uom_get(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    dimension = params['dimension'] if 'dimension' in params else None
    uom_id = params['uomId'] if 'uomId' in params else None

    if client_id is None or dimension is None or uom_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id, dimension and UOM Id is required'
        )

    services = request.services()
    store = services['stores.common.uoms']
    uom = {}
    try:
        r = store.get(client_id, dimension, uom_id)
        uom = {
            'id': r[0],
            'name': r[1],
            'symbol': r[2]
        }
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='unit found',
        body={
            'uom': uom
        }
    )