import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception


@view_config(
    route_name='api.common.currencies',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def api_common_currencies(request):
    params = request.json_body
    filter = params['filter'] if 'filter' in params else None

    services = request.services()
    store = services['store.common.currencies']
    currencies = []
    try:
        result = []
        if filter is None:
            result = store.all()
        else:
            result = store.filter(filter)

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

@view_config(
    route_name='api.common.currencies.get',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def api_common_currencies_get(request):
    params = request.json_body
    currency_id = params['currencyId'] if 'currencyId' in params else None

    if currency_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Currency Id is required'
        )

    services = request.services()
    store = services['store.common.currencies']
    currency = {}
    try:
        result = store.get(currency_id)
        r = result[0]
        currency = {
            'id': r[0],
            'name': r[1],
            'currency': r[2],
            'symbol': r[3]
        }
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Currency found',
        body={
            'currency': currency
        }
    )