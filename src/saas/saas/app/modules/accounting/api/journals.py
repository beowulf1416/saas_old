import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception


@view_config(
    route_name='api.accounting.journals.reference.add',
    request_method='POST',
    renderer='json'
)
def api_accounting_journal_reference_add(request):
    params = request.json_body
    log.debug(params)


@view_config(
    route_name='api.accounting.journals.add',
    request_method='POST',
    renderer='json'
)
def api_accounting_journals_add(request):
    params = request.json_body
    log.debug(params)