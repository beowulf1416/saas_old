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

@view_config(
    route_name='api.accounting.accounts.assign.parent',
    request_method='POST',
    renderer='json'
)
def view_accounting_accounts_set_parent(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    account_id = params['accountId'] if 'accountId' in params else None
    parent_account_id = params['parentAccountId'] if 'parentAccountId' in params else None

    if client_id is None or account_id is None or parent_account_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id, Account Id and Parent Account Id is required'
        )

    services = request.services()
    try:
        accountStore = services['store.accounting.accounts']
        accountStore.assign_account_parent(client_id, account_id, parent_account_id)
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Account updated',
        body={
            'message': 'account updated'
        }
    )
    

@view_config(
    route_name='api.accounting.accounts.all',
    request_method='POST',
    renderer='json'
)
def view_accounting_accounts_all(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None

    if client_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id is required'
        )

    services = request.services()
    accounts = []
    try:
        accountStore = services['store.accounting.accounts']
        result = accountStore.all(client_id)
        accounts = [
            { 'id': r[0], 'active': r[1], 'created_ts': r[2], 'type_id': r[3], 'name': r[4], 'description': r[5] }
            for r in result
        ]
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='{0} accounts found'.format(len(accounts)),
        body={
            'accounts': accounts
        }
    )

@view_config(
    route_name='api.accounting.accounts.children',
    request_method='POST',
    renderer='json'
)
def view_accounting_accounts_children(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    account_id = params['accountId'] if 'accountId' in params else None

    if client_id is None or account_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id and Account Id is required'
        )

    services = request.services()
    accounts = []
    try:
        accountStore = services['store.accounting.accounts']
        result = accountStore.getChildren(client_id, account_id)
        accounts = [
            { 'id': r[0], 'active': r[1], 'type_id': r[2], 'name': r[4] }
            for r in result
        ]
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='{0} accounts found'.format(len(accounts)),
        body={
            'accounts': accounts
        }
    )


@view_config(
    route_name='api.accounting.account.tree',
    request_method='POST',
    renderer='json'
)
def view_accounting_account_tree(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None

    if client_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id is required'
        )

    services = request.services()
    accounts = []
    try:
        accountStore = services['store.accounting.accounts']
        result = accountStore.getTree(client_id)
        accounts = [
            { 'id': r[0], 'type_id': r[1], 'name': r[2], 'description': r[3], 'level': r[4], 'path': r[5] }
            for r in result
        ]
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='{0} accounts found'.format(len(accounts)),
        body={
            'accounts': accounts
        }
    )


@view_config(
    route_name='api.accounting.accounts.filter',
    request_method='POST',
    renderer='json'
)
def view_accounting_accounts_filter(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    filter = params['filter'] if 'filter' in params else None

    if client_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id and filter is required'
        )

    services = request.services()
    accounts = []
    try:
        accountStore = services['store.accounting.accounts']
        result = accountStore.filter(client_id, filter)
        accounts = [
            { 
                'id': r[0], 
                'active': r[1],
                'type_id': r[2], 
                'name': r[3], 
                'description': r[4]
            }
            for r in result
        ]
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='{0} accounts found'.format(len(accounts)),
        body={
            'accounts': accounts
        }
    )