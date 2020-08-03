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
    poStore = services['store.purchasing.po']
    try:
        validator.validate(
            instance = params,
            schema_file = 'purchasing/purchase_order.json'
        )
        poStore.save(params)
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

@view_config(
    route_name='api.purchasing.purchase.orders.filter',
    request_method='POST',
    renderer='json'
)
def api_purchasing_po_filter(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    filter = params['filter'] if 'filter' in params else None

    if client_id is None or filter is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id and filter is required'
        )

    services = request.services()
    poStore = services['store.purchasing.po']
    pos = []
    try:
        result = poStore.filter(client_id, filter)
        pos = [
            {
                'id': r[0],
                'created': r[1],
                'description': r[2]
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
        detail='{0} purchase orders found'.format(len(pos)),
        body={
            'purchaseOrders': pos
        }
    )

@view_config(
    route_name='api.purchasing.purchase.orders.get',
    request_method='POST',
    renderer='json'
)
def api_purchasing_po_get(request):
    params = request.json_body

    client_id = params['clientId'] if 'clientId' in params else None
    po_id = params['purchaseOrderId'] if 'purchaseOrderId' in params else None

    if client_id is None or po_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id and Purchase Order Id is required'
        )

    services = request.services()
    poStore = services['store.purchasing.po']
    po = {}
    try:
        result = poStore.get_items(client_id, po_id)
        items = [
            {
                'id': r[0],
                'description': r[1],
                'quantity': r[2],
                'unit_id': r[3],
                'unit': r[4]
            }
            for r in result
        ]

        r = poStore.get(client_id, po_id)
        po = {
            'id': r[0],
            'created': r[1],
            'description': r[2],
            'facilityId': r[3],
            'vendorId': r[4],
            'instructions': r[5],
            'items': items
        }
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='purchase order found',
        body={
            'purchaseOrder': po
        }
    )