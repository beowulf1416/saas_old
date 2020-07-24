import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception

from jsonschema import validate
from jsonschema.exceptions import ValidationError

from saas.app.core.stores.base import StoreException


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
    except StoreException as e:
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
    except StoreException as e:
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

@view_config(
    route_name='api.accounting.transactions.filter',
    request_method='POST',
    renderer='json'
)
def api_accounting_transactions_filter(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    filter = params['filter'] if 'filter' in params else None

    if client_id is None or filter is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id and filter is required'
        )

    services = request.services()
    store = services['store.accounting.transactions']
    transactions = []

    try:
        result = store.filter(client_id, filter)
        transactions = [
            {
                'transaction_id': r[0],
                'created': r[1],
                'posted': r[2],
                'currency_id': r[3],
                'description': r[4]
            }
            for r in result
        ]
    except StoreException as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail=f'{len(transactions)} transaction found',
        body={
            'transactions': transactions
        }
    )


@view_config(
    route_name='api.accounting.transactions.get',
    request_method='POST',
    renderer='json'
)
def api_accounting_transactions_get(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    transaction_id = params['transactionId'] if 'transactionId' in params else None

    if client_id is None or transaction_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id and Transaction Id is required'
        )

    services = request.services()
    store = services['store.accounting.transactions']
    transaction = {}

    try:
        transaction = store.get(client_id, transaction_id)
    except StoreException as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='transaction found',
        body={
            'transaction': transaction
        }
    )


    