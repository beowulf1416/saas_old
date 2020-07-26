import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service

from saas.app.modules.accounting.stores.accounts import AccountsStore
from saas.app.modules.accounting.stores.groups import GroupStore
from saas.app.modules.accounting.stores.transactions import TransactionStore


def includeme(config):
    log.info('including: saas.app.modules.accounting.stores')

    services = get_service(None)
    mgr = services['connection.manager']

    groups = GroupStore(mgr, 'default')
    services['store.accounting.groups'] = groups
    services['store.accounting.accounts'] = AccountsStore(mgr, 'default', groups)
    services['store.accounting.transactions'] = TransactionStore(mgr, 'default')