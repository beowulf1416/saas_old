import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import json


@view_config(
    route_name='api.clients.all',
    request_method='POST',
    renderer='json'
)
def api_clients_all(request):
    services = request.services()
    try:
        clientsStore = services['store.admin.clients']
        clients = clientsStore.getAll()
        result = [{ 'id': c[0], 'name': c[1], 'active': c[2]} for c in clients]
        return {
            'status': 'success',
            'message': '{0} clients'.format(len(clients)),
            'json': json.dumps(result)
        }
    except Exception as e:
        log.error(e)
        return {
            'status': 'error',
            'message': 'An error occured while retrieving clients',
            'json': None
        }
    