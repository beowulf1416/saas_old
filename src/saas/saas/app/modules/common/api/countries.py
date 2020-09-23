import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception


@view_config(
    route_name='api.common.countries',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def api_common_countries(request):
    params = request.json_body
    filter = params['filter'] if 'filter' in params else None

    services = request.services()
    store = services['store.common.countries']
    countries = []
    try:
        if filter is None:
            result = store.all()
            countries = [
                {
                    'name': r[0],
                    'alpha_2': r[1],
                    'alpha_3': r[2],
                    'id': r[3]
                }
                for r in result
            ]
        else:
            result = store.filter(filter)
            countries = [
                {
                    'name': r[0],
                    'alpha_2': r[1],
                    'alpha_3': r[2],
                    'id': r[3]
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
        detail='{0} countries found'.format(len(countries)),
        body={
            'countries': countries
        }
    )


@view_config(
    route_name='api.common.countries.get',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def api_common_countries_get(request):
    params = request.json_body
    country_id = params['countryId'] if 'countryId' in params else None

    if country_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Country Id is required'
        )

    services = request.services()
    store = services['store.common.countries']
    country = {}
    try:
        r = store.get(country_id)
        country = {
            'name': r[0],
            'alpha_2': r[1],
            'alpha_3': r[2],
            'id': r[3]
        }
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='country found',
        body={
            'country': country
        }
    )