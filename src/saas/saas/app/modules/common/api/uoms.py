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

        currencies = [
            {
                'id': r[0],
                'name': r[1],
                'currency': r[2],
                'symbol': r[3]
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
        detail=f'{len(currencies)} countries found',
        body={
            'currencies': currencies
        }
    )