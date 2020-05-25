import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception


@view_config(
    route_name='api.accounting.accounts.types',
    request_method='POST',
    renderer='json'
)
def view_accounting_accounts_types(request):
    types = []
    services = request.services()
    try:
        accountStore = services['store.accounting.accounts']
        result = accountStore.accountTypesAll()
        types = [
            { 'id': r[0], 'name': r[1] }
            for r in result
        ]
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Account added',
        body={
            'types': types
        }
    )


@view_config(
    route_name='api.accounting.accounts.add',
    request_method='POST',
    renderer='json'
)
def view_accounting_accounts_add(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    type_id = params['typeId'] if 'typeId' in params else None
    name = params['name'] if 'name' in params else None
    description = params['description'] if 'description' in params else None
    parent = params['parentAccountId'] if 'parentAccountId' in params else None

    if client_id is None or name is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id, Account Type Id and Name is required'
        )

    services = request.services()
    try:
        accountStore = services['store.accounting.accounts']
        accountStore.add(client_id, type_id, name, description)
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Account added',
        body={
            'message': 'Account added'
        }
    )