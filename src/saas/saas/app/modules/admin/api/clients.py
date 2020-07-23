import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception

import json


@view_config(
    route_name='api.clients.all',
    request_method='POST',
    accept='application/json',
    permission='admin.clients'
)
def api_clients_all(request):
    clients = []
    services = request.services()
    try:
        clientsStore = services['store.admin.clients']
        result = clientsStore.getAll()
        clients = [
            { 
                'id': c[0], 
                'active': c[1], 
                'name': c[2], 
                'address': c[3],
                'country_id': c[4],
                'currency_id': c[5]
            } 
            for c in result
        ]
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )
    raise exception.HTTPOk(
        detail='{0} clients'.format(len(clients)),
        body={ 'clients': clients }
    )

@view_config(
    route_name='api.clients.add',
    request_method='POST',
    accept='application/json',
    permission='admin.clients'
)
def view_clients_add(request):
    params = request.json_body
    name = params['name'] if 'name' in params else None
    address = params['address'] if 'address' in params else None
    country_id = params['countryId'] if 'countryId' in params else None
    currency_id = params['currencyId'] if 'currencyId' in params else None

    if name is None or address is None or country_id is None or currency_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client, name, address and country Id is required'
        )

    services = request.services()
    try:
        clientsStore = services['store.admin.clients']
        result = clientsStore.add(name, address, country_id)
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Client added',
        body={
            'message': 'Client added',
            'clientId': result
        }
    )
    

@view_config(
    route_name='api.clients.update',
    request_method='POST',
    accept='application/json',
    permission='admin.clients'
)
def view_clients_update(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    name = params['name'] if 'name' in params else None
    address = params['address'] if 'address' in params else None
    country_id = params['countryId'] if 'countryId' in params else None
    currency_id = params['currencyId'] if 'currencyId' in params else None
    
    if client_id is None or name is None or address is None or country_id is None or currency_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id, name, address, country id and currency id is required'
        )

    services = request.services()
    try:
        clientsStore = services['store.admin.clients']
        clientsStore.update(client_id, name, address, country_id, currency_id)
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Client updated',
        body={'message': 'Client update'}
    )


@view_config(
    route_name='api.clients.get',
    request_method='POST',
    accept='application/json',
    permission='admin.clients'
)
def view_clients_get(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None

    if client_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id is required'
        )
    
    services = request.services()
    client = None
    try:
        clientsStore = services['store.admin.clients']
        client = clientsStore.get(client_id)
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    if client is None:
        raise exception.HTTPInternalServerError(
            detail='Client not found',
            explanation='Client not found'
        )
    else:
        raise exception.HTTPOk(
            detail='client',
            body={'client': { 
                'id': client[0],
                'active': client[1],
                'name': client[2],
                'address': client[3],
                'country_id': client[4],
                'currency_id': client[5]
            }}
        )


@view_config(
    route_name='api.clients.setactive',
    request_method='POST',
    accept='application/json',
    permission='admin.clients'
)
def view_client_set_active(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    active = params['active'] if 'active' in params else None

    if client_id is None or active is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Client Id and Active state is required'
        )

    services = request.services()
    try:
        clientsStore = services['store.admin.clients']
        clientsStore.setActive(client_id, active)
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Client active state changed',
        body={'message': 'Client active state changed'}
    )


@view_config(
    route_name='api.clients.filter',
    request_method='POST',
    accept='application/json',
    permission='admin.clients'
)
def view_clients_filter(request):
    params = request.json_body
    filter = params['filter'] if 'filter' in params else None

    if filter is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameters',
            explanation='Filter is required'
        )

    services = request.services()
    clients = []
    try:
        clientsStore = services['store.admin.clients']
        result = clientsStore.filter(filter)
        clients = [
            { 
                'id': c[0], 
                'active': c[1], 
                'name': c[2], 
                'address': c[3],
                'country_id': c[4],
                'currency_id': c[5]
            } 
            for c in result
        ]
    except Exception as e:
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='{0} clients found'.format(len(clients)),
        body={
            'clients': clients
        }
    )