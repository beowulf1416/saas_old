import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config

@view_config(
    route_name='inventory.transactions.receiving',
    request_method='GET',
    renderer='saas.app.modules.inventory:templates/default.html'
)
def view_inv_transaactions_receiving(request):
    return {}