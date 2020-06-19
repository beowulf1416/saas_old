import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception


@view_config(
    route_name='api.common.countries',
    request_method='POST',
    renderer='json'
)
def api_common_countries(request):
    services = request.services()
    store = services['stores.common.countries']
    countries = []
    try:
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