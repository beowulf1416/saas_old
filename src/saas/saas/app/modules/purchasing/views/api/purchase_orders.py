import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception

from jsonschema.exceptions import ValidationError
import json


@view_config(
    route_name='api.purchasing.purchase.orders.save',
    request_method='POST',
    renderer='json'
)
def api_purchasing_po_add(request):
    params = request.json_body

    services = request.services()
    validator = services['validator.json']
    try:
        validator.validate(
            instance = params,
            schema_file = '/purchasing/purchase_order.json'
        )
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
        detail='Purchase Order created',
        body={
            'message': 'Purchase Order created'
        }
    )