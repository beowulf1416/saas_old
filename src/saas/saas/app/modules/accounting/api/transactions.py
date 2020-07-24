import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception

from jsonschema import validate
from jsonschema.exceptions import ValidationError


@view_config(
    route_name='api.accounting.transactions.add',
    request_method='POST',
    renderer='json'
)
def api_accounting_transactions_add(request):
    params = request.json_body

    services = request.services()
    validator = services['validator.json']
    store = services['store.accounting.transactions']

    try:
        validator.validate(
            instance = params,
            schema_file = 'accounting/accounting_transaction.json'
        )
        store.add(params)
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Accounting Transaction recorded',
        body={
            'message': 'Accounting Transaction recorded'
        }
    )


@view_config(
    route_name='api.accounting.transactions.update',
    request_method='POST',
    renderer='json'
)
def api_accounting_transactions_update(request):
    params = request.json_body

    services = request.services()
    validator = services['validator.json']
    store = services['store.accounting.transactions']

    try:
        validator.validate(
            instance = params,
            schema_file = 'accounting/accounting_transaction.json'
        )
        store.update(params)
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Accounting Transaction updated',
        body={
            'message': 'Accounting Transaction updated'
        }
    )