import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service

from saas.app.modules.accounting.stores.accounts import AccountsStore


def includeme(config):
    log.info('including: saas.app.modules.accounting.stores')

    services = get_service(None)
    mgr = services['connection.manager']

    accountsStore = AccountsStore(mgr)
    services['store.accounting.accounts'] = accountsStore